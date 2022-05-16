import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { login } from '../utils';
import { useState } from 'react';

export default function Login() {
    const navigate = useNavigate()
    const [encours, setStatus] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = async (data) => {
        console.log('data fill',  data)
        setStatus(true) 
        const result = await login(data)
        setStatus(false) 
        if(result.error){
            alert(result.message)
        }else{
            navigate('/')
        }

    }

    return (
        <>
            <section className="h-full gradient-form bg-gray-200 md:h-screen mx-auto">
                <div className="container py-12 px-6 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="xl:w-10/12">
                            <div className="block bg-white shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="lg:w-6/12 px-4 md:px-0">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <img
                                                    className="mx-auto w-48"
                                                    src={require('../asset/img/logo1.JPG')}
                                                    alt="logo1"
                                                />
                                            </div>
                                        
                                            <form  onSubmit={handleSubmit(onSubmit)} >
                                        
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Username"
                                                        {...register("user_name", { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        id="exampleFormControlInput1"
                                                        placeholder="Password"
                                                        {...register("mot_de_passe", { required: true })}
                                                    />
                                                </div>
                                                <div className="text-center pt-1 mb-12 pb-1">
                                                    <button
                                                        className="login inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                       
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        {!encours ?
                                                            "Connexion" :
                                                            "En cours ..."
                                                        }
                                                    </button>
                                                    <a className="text-gray-500" >Mot de passe oublié</a>
                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">Pas encore enregistré</p>
                                                    <span
                                                        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                        <Link to="/register">
                                                            Créer mon compte
                                                        </Link>

                                                    </span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="login-text lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                    >
                                        <div className="text-white px-4 py-6 md:p-50 md:mx-6 ">
                                                       
                                            <img
                                                    className="mx-auto w-48 pb-5"
                                                    src="https://zenpark.com/Images/HowItWorks/screenSearch_small.png"
                                                    alt="logo"
                                                />
                                            <p className="text-sm font-semibold">
                                             PLusieurs places, réservez votre stationnement en toute sérénité.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
