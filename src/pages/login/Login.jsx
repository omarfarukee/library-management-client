import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa6";
import './Login.css'
import 'animate.css';
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";
const Login = () => {
    const navigate = useNavigate()
    const { addToast } = useToasts();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const handleLoginUser = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/api/User/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log(responseData);

            if (responseData.message === "Login successful") {
                console.log('Login successful');
                addToast('User Log in successfully', { appearance: 'success' })
                sessionStorage.setItem('userData', JSON.stringify(responseData));
                navigate('/')
                reset();
            } else {
                addToast(`${responseData.error}`, { appearance: 'error' })

            }
        } catch (error) {
            // console.error('Error during login:', error);
            addToast('some problem occured while login', { appearance: 'error' })
        }
    }



    const [types, setTypes] = useState(true)
    const passwordFieldType = (type) => {
        switch (type) {
            case "current":
                return types ? "password" : "text";
        }
    };
    const seePass = (type) => {
        switch (type) {
            case "current":
                setTypes(!types);
                break;
        }
    };
    return (
        <div className='flex'>
            <div className='flex items-center justify-center h-screen login-background'>
            <div className='relative bottom-72 right-56'>
                   <NavLink to='/'><h1 className='text-white'> Home</h1></NavLink> 
                </div>
            <div>
                <div className='flex justify-center w-64 p-5 bg-transparent rounded-lg shadow-2xl h-28 backdrop-blur-md'>
                    <h1 className='text-5xl italic font-bold text-white'>
                        Log-in
                    </h1>
                </div>
                <h1 className='flex justify-center mt-2 text-white'>New in here?  <NavLink to='/SignUp'> <span>Sign-Up</span></NavLink></h1>
                </div>
            </div>
            <div className='login-container '>
                <div className='flex items-center justify-center h-screen '>
                    <form onSubmit={handleSubmit(handleLoginUser)} className='p-4 shadow-2xl w-96 rounded-xl animate__animated animate__flipInY'>
                        <div className='flex justify-center'>
                            <div>
                                <span className="flex justify-center text-blue-500"> <FaUserCheck className="text-5xl font-bold icons" /></span>
                                <h1 className="text-lg font-bold uppercase ">user Log-in</h1>
                            </div>

                        </div>
                        <input type="email" {...register("email", {
                            required: "*"
                        })} placeholder="Email" defaultValue='omar1920@gmail.com' />
                        {errors.email && <small className='relative ml-2 text-red-500 right-2 '>{errors.email?.message}</small>}
                        <input type={passwordFieldType("current")}  {...register("pass", {
                            required: "Required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} placeholder="🗝 Password..." defaultValue='4XNd@qDc5ZHxp6T' />
                        <div className="flex justify-end">
                            <a className='relative bottom-10 right-2' title="See password" onClick={() => seePass("current")}><FaEye className="text-2xl" /></a>
                        </div>
                        {errors.pass && <small className='relative ml-2 text-red-500 bottom-14'>{errors.pass.message}</small>}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

            </div>
        </div>

    );
};
export default Login;