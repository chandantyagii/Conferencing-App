import { useForm } from "react-hook-form";

function Login() {

    const { register, handleSubmit } = useForm();

    function submitForm(data) {
        console.log(data.email);
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-4">

                <div>
                    <h1>Login User</h1>
                    <label htmlFor="first">Email</label>
                    <input
                        id="first"
                        type="text"
                        {...register("email")}
                        className="w-64 px-3 py-2 mt-1 mb-4 border border-black rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="third">Password</label>
                    <input
                        id="third"
                        type="password"
                        {...register("password")}
                        className="w-64 px-3 py-2 mt-1 mb-4 border border-black rounded-md outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-64 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Login
                </button>

            </form>
        </>
    );
}

export default Login;
