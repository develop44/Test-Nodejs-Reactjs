import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createUser, getRoles } from '../utils';
import { useSelector } from 'react-redux';

export default function Register() {
    const roles = useSelector(app =>app.roles)
    const [encours, setStatus] = useState(false)

    async function onGetRoles(){
        await getRoles()
    }

    useEffect(() => {
        onGetRoles()
    }, []);

    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const onSubmit = async (data) => {
        console.log('data fill',  data)
        setStatus(true) 
        const result = await createUser(data)
        setStatus(false) 
        if(result.error){
            alert(result.message)
        }else{
            alert('Utilisateur crée')
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
                                                    alt="logo"
                                                />
                                            </div>
                                            <form onSubmit={handleSubmit(onSubmit)} >
                                            
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Nom"Z
                                                        {...register("nom", { required: true })}
                                                        error={errors.nom}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Prenom"
                                                        {...register("prenom", { required: true })}
                                                        error={errors.prenom}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Télephone"
                                                        {...register("numero_telephone", { required: true })}
                                                        error={errors.numero_telephone}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Email"
                                                        {...register("user_name", { required: true })}
                                                        error={errors.user_name}
                                                    />
                                                </div>
                                                
                                                <div className="mb-4">
                                                    <select
                                                         className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                         {...register("roleId", { required: true })}
                                                         required
                                                    >
                                                        <option value={null} disabled selected>Sélectionner votre rôle</option>
                                                        {roles && roles.map(r =>
                                                            <option value={r.id} key={r.id}>
                                                                {r.nom}
                                                            </option>
                                                        )

                                                        }
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Mot de passe"
                                                        {...register("mot_de_passe", { required: true })}
                                                        error={errors.mot_de_passe}
                                                        />
                                                
                                                </div>
                                                <div className="text-center pt-1 mb-12 pb-1">
                                                    <button
                                                        className="login inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                       
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                        disabled={encours}
                                                    >   
                                                        {!encours?
                                                            "Créer mon compte"
                                                            :
                                                            "Encours ..."
                                                        }
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between pb-6">
                                                    <p className="mb-0 mr-2">J'ai déjà un compte</p>
                                                    <span
                                                        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                        data-mdb-ripple="true"
                                                        data-mdb-ripple-color="light"
                                                    >
                                                            <NavLink to="/login">
                                                                Me connecter
                                                            </NavLink> 
                                                    </span>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        className="login-text lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                                    >
                                        <div className="text-white px-4 py-6 md:p-50 md:mx-6 ">
                                  {/* <h4 className="text-xl text-center  font-semibold mb-6">BlackParkinG</h4> */}
                                        
                                                                             
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
