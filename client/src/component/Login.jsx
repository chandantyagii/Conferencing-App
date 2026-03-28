import { useForm } from "react-hook-form";
import instance from "../services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

 async   function submitForm(data) {

        const response = await  instance.post(  "api/auth/login"  , data );


        if(response.status  === 200 ){
            console.log(response.data);
            localStorage.setItem("token" , response.data.token  );
            localStorage.setItem("name" ,  response.data.name  );
            navigate("/");
        }else {
            alert('api  is not responsing ');
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit(submitForm)}
                className="bg-gray-200 p-8 rounded-lg w-80 flex flex-col gap-4"
            >


                <h1 className="text-center text-xl font-semibold">
                    LOGIN
                </h1>



                <div>
                    <label className="block text-black mb-1">
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="Enter email"
                        {...register("email")}
                        className="w-full px-3 py-2 rounded border border-gray-400 outline-none"
                    />
                </div>


                <div>
                    <label className="block text-black mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                        className="w-full px-3 py-2 rounded border border-gray-400 outline-none"
                    />
                </div>



                <p className="text-sm">
                    No account?
                    <Link to="/register" className="text-blue-500 underline ml-1">
                        Register
                    </Link>
                </p>



                <button
                    type="submit"
                    className="mt-2 bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
                >
                    LOGIN
                </button>



            </form>
        </div>
    );
}

export default Login;
