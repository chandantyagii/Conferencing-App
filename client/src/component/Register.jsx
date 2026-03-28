import { useForm } from "react-hook-form";
import instance from "../services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

  async  function submitForm(data) {

    // reposne is the axios objec that for lnke this strucutre{
    //   data: { message: "User registered successfully" },
    //   status: 200,
    //       statusText: "OK",
    //           headers: { ... },
    //   config: { ... },
    //   request: { ... }

    try
    {
        const response = await instance.post("api/auth/register" , data );

        if( response.data.success  ){

            navigate("/login");   // change path as needed
        }else{
            alert(response.data.message);
        }

    }catch(err){
        console.log("register api breaking"+err )
        alert('register api breaking')
    }

}

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit(submitForm)}
                className="bg-gray-200 p-8 rounded-lg w-80 flex flex-col gap-4"
            >

                <h1 className="text-center text-xl font-semibold">
                    REGISTER
                </h1>


                <div>
                    <label className="block text-black mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        {...register("name")}
                        className="w-full px-3 py-2 rounded border border-gray-400 outline-none"
                    />
                </div>


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
                    Already have an account?
                    <Link to="/" className="text-blue-500 underline ml-1 hover:text-blue-700">
                        Login
                    </Link>
                </p>

                <button
                    type="submit"
                    className="mt-2 bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
                >
                    REGISTER
                </button>




            </form>

        </div>
    );
}

export default Register;
