import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'universal-cookie';
import toast, { Toaster } from 'react-hot-toast';
import Axios from '@/helpers/Axios';

const Login = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const router  = useRouter()
    const cookie = new Cookies();
  
    const onSubmit = async({ password }) => {
        Axios("post", "/login", { password })
        .then(res=>{
            if(res.success){
                console.log(res);
                cookie.set("__token__", res.token, { path: '/' })
                router.push("/")
            }
        })
    }   


    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <section className="login-section">
                <div className="login-card">
                    <h2>Login</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)} 
                    >   
                        <input 
                            type="password" 
                            placeholder="Password"
                            {...register("password",
                                {
                                    required: 'Password is required.'
                                }
                            )}  
                        />
                        <button className="mt-15">Submit</button>
                    </form>
                </div>
            </section>
        </>

    );
};

export default Login;