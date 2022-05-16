import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

export default function PlaceParking({ place, users, onUpdate }) {
    const user = useSelector(app => app.user)

    
    const onCalCulTempsOccupation = () => {
        const oldDate = new Date(place.updatedAt)
        const now = new Date()
        const diff =   now.getHours()*60 + now.getMinutes() - oldDate.getHours()*60 - oldDate.getMinutes();

        //setTemp(diff)
        return Math.abs(diff)
    }
    useEffect(() => {
    //    const interval = setInterval(onCalCulTempsOccupation, 1000);
    //    setIntervalState(interval)
    }, []);

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            {user && user.id === place?.user?.id &&
            <span className="absolute mx-auto w-5 h-5 items-center justify-center text-2xl font-bold leading-none text-green-100 bg-green-600 rounded-full"> 
            </span>
            }

            <div className=" mx-auto w-12 items-center justify-center px-4 py-2 text-2xl font-bold leading-none text-red-100 bg-red-600 rounded-full">
               <h1 className='glow'>
                 {place.numero_place}
                </h1> 
            </div>
            {place?.user &&
                <h5 className="text-gray-900 text-base leading-tight font-medium mb-2">
                    Temps d'occupation: {onCalCulTempsOccupation()} <span className="text-xs">min</span>
                </h5>
            }
            <h5 className="text-gray-900 text-base leading-tight font-medium mb-2">
                Etage: {place.numero_etage}
            </h5>
            <div>
                {!place.user?
                    <span>
                        {user?.role === "admin"&&
                            <select
                                value={place.userId}
                                onChange={(evt) =>onUpdate(evt, place.id)}
                                className="w-full"
                            >
                                <option disabled value={null} selected>Attribué a un user</option>
                                {users && users.map(user => <option key={user.id} value={user.id}>{user.prenom + " " +user.nom}</option>)}
                            </select>
                        }
                    </span>
                    :
                    <div className="">  
                        <img src={require('../asset/img/car.PNG')} className="w-20"/>
                        <button onClick={()=>{ onUpdate(null, place.id)}} className="relative float-right bg-red-700 text-white rounded-full -mt-10">
                            <img src={require('../asset/img/cancel.png')} className="w-7"/>
                        </button>
                        {user && user.role === "admin" ?
                            <p>
                                Occupé par: <span className='font-bold'>{place?.user?.nom}</span>
                            </p>
                            :
                            <p>
                                <span className='font-bold'>Place occupé</span>
                            </p>
                        }
                        
                    </div>
                }
            </div>
        </div>
    )
}