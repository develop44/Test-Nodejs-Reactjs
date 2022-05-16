import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { createPlace, deleteUser, getPlace, getUser, updatePlace, getRoles, updateUser, logout } from '../utils';
import { useSelector } from 'react-redux';
import PlaceParking from "../comosants/PlaceParking";
import Button from "../comosants/Button";
import FiltreParEtage from "../comosants/FiltreParEtage";
import FiltreParUser from "../comosants/FiltreParUser";


export default function Home() {

    const user = useSelector(app => app.user)
    console.log('')
    const places = useSelector(app => app.places)
    const users = useSelector(app => app.users)

    const [keywordEtage, setKeywordEtage] = useState('')
    const [rechercheParETage, setRechercheParEtage] = useState(false)
    const [refres, setRefresh] = useState(false)
    const [userId, setUserId] = useState("Tous")
    const navigate = useNavigate()

    async function onGetPlace(id) {
        await getPlace(keywordEtage)
    }
    async function onLogout() {
        const result = await logout();
        if(result && !result.error){
            navigate('/Login')
            alert(result.message)
        }
        else if(result && result.error){
            alert(result.message)
        }else{
            alert('Erreur inconnu')
        }
    }
    async function onDelete(id) {
        if (user && user.id === id) {
            return alert("Vous ne pouvez pas vous suprimez !")
        }
        const result = await deleteUser(id)
        if (result && !result.error) {
            for (let index = 0; index < places.length; index++) {
                const elt = places[index];
                if (elt.user?.id === id) {
                    onUpdate(null, elt.id)
                }

            }
            onGetUser()
        } else {
            alert(result && result.message || "Erreur inconnu survenu")
        }
    }

    async function onGetUser() {
        await getUser()
    }

    function onShowRechercheParETage() {
        setRechercheParEtage(!rechercheParETage)
    }


    const onUpdate = async (evt, id) => {
        const result = await updatePlace(id, { userId: evt ? evt.target.value : null })
        //console.log('ev==', evt.target.value, id, result)
    }
    const filtrebyMe = async () => {
        if (userId == user.id) {
            return setUserId("Tous")
        }
        setUserId(user.id)
        //console.log('ev==', evt.target.value, id, result)
    }
    async function onGetRoles() {
        await getRoles()
    }


    const refrest = () => setRefresh(!refres)

    useEffect(() => {
        onGetPlace()
        onGetRoles()
        onGetUser()
        setInterval(refrest, 1000);
    }, []);


    return (
        <div>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    
                        <img src={require('../asset/img/logo2.JPG')} className="mr-3 h-6 sm:h-9" alt="Logo"></img>
                    
                    <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <span className='font-bold -ml-32'>
                                Bienvenue {user? user.nom : ""}
                                </span>
                            </li>
                            <li>
                                <button onClick={onLogout} className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Déconnexion
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
                <div className="container lg:col-span-2 bg-slate-400 h-full w-full p-12">



                    <div className="w-full h-full bg-slate-300 mx-auto rounded p-10">

                        <div className=" block p-6 rounded-lg shadow-lg bg-white w-full">

                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10'>
                                {user && user.role === "admin" && <Button data-bs-toggle="modal" next={() => { }} data-bs-target="#exampleModal" title='Nouvelle place' />}
                                <Button title="Recherche par etage" next={onShowRechercheParETage} />
                                <Button title={userId !== user?.id ? "où ai-je garé ma voiture" : "Annuler le filtre"} next={filtrebyMe} />
                                <Button title="Editer mon profil" next={() => { }} data-bs-toggle="modal" data-bs-target="#exampleModal2" />
                            </div>

                            <div className='flex gap-4 justify-content'>
                                {refres && ""}
                                {rechercheParETage && <FiltreParEtage onFiltre={onGetPlace} setKeywordEtage={setKeywordEtage} />}
                                {/* {rechercheParUser && <FiltreParUser onFIltreByUser={setUserId} />} */}

                            </div>

                            {(places && places.length === 0 || places && places.filter(place => userId === "Tous" ? true : parseInt(place?.user?.id) === parseInt(userId)).length === 0) &&

                                <p className='pt-5 font-bold text-center'>
                                    Aucun resultat trouvé
                                </p>
                            }

                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-16 pt-10">
                            {places && places.sort((a, b) => b.id - a.id)
                                .filter(place => userId === "Tous" ? true : parseInt(place?.user?.id) === parseInt(userId))
                                .map(place => <PlaceParking onUpdate={onUpdate} key={place.id} place={place} users={users} />)}
                        </div>
                    </div>

                    {user &&<NewPlace />}
                    {user &&<UpdateMe />}
                </div>
                {user && user.role === "admin" &&
                    <div className='p-5 bg-slate-300'>
                        <div className='block p-6 rounded-lg shadow-lg bg-white w-full'>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-center">
                                                <thead className="border-b bg-gray-800">
                                                    <tr>
                                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                            Nom
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                            Rôle
                                                        </th>
                                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users && users.map(user =>
                                                        <tr className="bg-white border-b" key={user.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {user.nom}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                {user.role?.code}
                                                            </td>
                                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                                                <button onClick={() => onDelete(user.id)} className="relative float-right bg-red-700 text-white rounded-full">
                                                                    <img src={require('../asset/img/cancel.png')} className="w-5" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}


const NewPlace = () => {
    const [encours, setStatus] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log('data fill', data)
        setStatus(true)
        const result = await createPlace(data)
        setStatus(false)
        if (result.error) {
            alert(result.message)
        } else {

            alert("Succès !")
        }

    }


    return (
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog relative w-auto pointer-events-none">
                <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div
                            className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Nouvelle place</h5>
                            <button type="button"
                                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                                data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body relative p-4">
                            <div className="mb-4">
                                <input
                                    type="number"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Numéro"
                                    {...register("numero_place", { required: true })}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput1"
                                    placeholder="Numéro étage"
                                    {...register("numero_etage", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="modal-footer flex gap-4 px-10">

                            <span
                                className="text-center cursor-pointer login inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                data-bs-dismiss="modal"
                            >
                                Annuler
                            </span>
                            <Button title={!encours ? "Créer" : "En cours ..."} type="submit" />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


const UpdateMe = () => {
    const roles = useSelector(app => app.roles)
    const [encours, setStatus] = useState(false)
    const user = useSelector(app => app.user)

    const [nom, setNom] = useState(user.nom)
    const [prenom, setPren] = useState(user.prenom)
    const [role, setRole] = useState(user.role)
    const [numero_telephone, setTel] = useState(user.numero_telephone)


    const onSubmit = async () => {
        setStatus(true)
        const rol = roles.find(a => a.code === role)
        const result = await updateUser(user.id, { nom: nom, prenom: prenom, numero_telephone: numero_telephone, roleId: rol?.id })
        setStatus(false)
        if (result.error) {
            alert(result.message)
        } else {
            await getUser()
            alert("Succès !")
        }

    }





    return (
        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModal2Label" aria-hidden="true">
            <div className="modal-dialog relative w-auto pointer-events-none">
                <div className=" p-10 modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">

                    <p className="mb-4">Modifier mon compte</p>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Nom"
                            value={nom}
                            onChange={(evt) => setNom(evt.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Prenom"
                            onChange={(evt) => setPren(evt.target.value)}
                            value={prenom}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Télephone"
                            onChange={(evt) => setTel(evt.target.value)}
                            value={numero_telephone}
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            onChange={(evt) => setRole(evt.target.value)}
                            required
                            defaultValue={role}
                        >
                            {roles && roles.map(r =>
                                <option value={r.code} key={r.id}>
                                    {r.nom}
                                </option>
                            )

                            }
                        </select>
                    </div>
                    <div className="text-center pt-1 mb-12 pb-1">
                        <button
                            className="login inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"

                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            disabled={encours}
                            onClick={onSubmit}
                        >
                            {!encours ?
                                "Enregistrer"
                                :
                                "Encours ..."
                            }
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
