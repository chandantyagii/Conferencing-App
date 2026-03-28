import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import agoraConfig from "../agoraConfig";

// This creates ONE Agora client for the whole session
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const MeetRoom = () => {
    const { roomName } = useParams();
    const navigate = useNavigate();
    const localVideoRef = useRef(null);

    const [localTracks, setLocalTracks] = useState({ audio: null, video: null });
    const [remoteUsers, setRemoteUsers] = useState([]);
    const [isMuted, setIsMuted] = useState(false);
    const [isCamOff, setIsCamOff] = useState(false);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        joinChannel();

        // Cleanup when user leaves the page
        return () => {
            leaveChannel();
        };
    }, []);

    async function joinChannel() {
        // 1. Listen for other users joining
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);

        // 2. Join the Agora channel (null token = testing mode)
        await client.join(agoraConfig.appId, roomName, null, null);

        // 3. Create your own camera + mic tracks
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

        // 4. Show your own video in the local box
        videoTrack.play(localVideoRef.current);

        // 5. Publish your tracks so others can see/hear you
        await client.publish([audioTrack, videoTrack]);

        setLocalTracks({ audio: audioTrack, video: videoTrack });
        setJoined(true);
    }

    // When a remote user publishes their stream
    async function handleUserPublished(user, mediaType) {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
            setRemoteUsers((prev) => {
                // avoid duplicates
                if (prev.find((u) => u.uid === user.uid)) return prev;
                return [...prev, user];
            });

            // Small delay so the div renders before we try to play video into it
            setTimeout(() => {
                user.videoTrack?.play(`remote-${user.uid}`);
            }, 100);
        }

        if (mediaType === "audio") {
            user.audioTrack?.play();
        }
    }

    // When a remote user leaves
    function handleUserUnpublished(user) {
        setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
    }

    async function leaveChannel() {
        localTracks.audio?.close();
        localTracks.video?.close();
        client.removeAllListeners();
        await client.leave();
    }

    async function handleLeave() {
        await leaveChannel();
        navigate("/");
    }

    async function toggleMute() {
        await localTracks.audio?.setEnabled(isMuted);
        setIsMuted(!isMuted);
    }

    async function toggleCam() {
        await localTracks.video?.setEnabled(isCamOff);
        setIsCamOff(!isCamOff);
    }

    return (
        <div className="h-screen bg-gray-900 flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-3 bg-gray-800">
                <h1 className="text-white text-xl font-bold">MeetEx</h1>
                <span className="text-gray-300 text-sm">Room: {roomName}</span>
            </div>

            {/* Video Grid */}
            <div className="flex-1 p-4 grid grid-cols-2 gap-4 overflow-auto">

                {/* Your own video */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                    <div ref={localVideoRef} className="w-full h-full min-h-48" />
                    <span className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                        You {isMuted ? "(muted)" : ""} {isCamOff ? "(cam off)" : ""}
                    </span>
                </div>

                {/* Remote users videos */}
                {remoteUsers.map((user) => (
                    <div key={user.uid} className="relative bg-gray-800 rounded-lg overflow-hidden">
                        <div id={`remote-${user.uid}`} className="w-full h-full min-h-48" />
                        <span className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                            User {user.uid}
                        </span>
                    </div>
                ))}

                {/* Waiting message if no one else has joined yet */}
                {remoteUsers.length === 0 && joined && (
                    <div className="bg-gray-800 rounded-lg flex items-center justify-center min-h-48">
                        <p className="text-gray-400">Waiting for others to join...</p>
                    </div>
                )}
            </div>

            {/* Controls Bar */}
            <div className="bg-gray-800 py-4 flex justify-center gap-6">

                <button
                    onClick={toggleMute}
                    className={`px-6 py-2 rounded-full text-white font-medium ${isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
                        }`}
                >
                    {isMuted ? "Unmute" : "Mute"}
                </button>

                <button
                    onClick={toggleCam}
                    className={`px-6 py-2 rounded-full text-white font-medium ${isCamOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-600 hover:bg-gray-700"
                        }`}
                >
                    {isCamOff ? "Start Cam" : "Stop Cam"}
                </button>

                <button
                    onClick={handleLeave}
                    className="px-6 py-2 rounded-full bg-red-500 text-white font-medium hover:bg-red-600"
                >
                    Leave
                </button>

            </div>
        </div>
    );
};

export default MeetRoom;
