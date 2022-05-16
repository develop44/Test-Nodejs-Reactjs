import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

export default function FiltreParUser({onFIltreByUser}) {
    const users = useSelector(app => app.users)
    const places = useSelector(app => app.places)

    function onFiltre(value){
        console.log('value ...', value)
        onFIltreByUser(value)
    }

    useEffect(() => {
    }, []);

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white mx-auto">
            <h5 className="text-gray-900 text-base leading-tight font-medium mb-2">
                FIltre par user
            </h5>
            <div className='flex'>
                <select
                    onChange={(evt) => onFiltre(evt.target.value)}
                >
                    <option value={"Tous"} selected>Tous</option>
                    {users && users.map(user => <option key={user.id} value={user.id}>{user.prenom + " " + user.nom}</option>)}
                </select>
            </div>
            
        </div>
    )
}