import { useForm } from "react-hook-form";

function Register() {

    const { register, handleSubmit } = useForm();

    function submitForm(data) {
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitForm)}>
                <div>
                    <h1>Register User</h1>
                    <label htmlFor="first">Name</label>
                    <input id="first" type="text" {...register("name")} className="border border-black" />
                </div>

                <div>
                    <label htmlFor="second">Email</label>
                    <input id="second" type="text" {...register("email")} className="border border-black" />
                </div>

                <div>
                    <label htmlFor="third">Password</label>
                    <input id="third" type="password" {...register("password")} className="border border-black" />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
            </form>
        </>
    );
}

export default Register;
