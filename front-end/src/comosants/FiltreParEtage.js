import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Button from './Button';

export default function FiltreParEtage({ onFiltre, setKeywordEtage }) {
    const places = useSelector(app => app.places)

    useEffect(() => {
    }, []);

    return (
        <div className="block p-6 rounded-lg shadow-lg bg-white mx-auto w-full">
            <h5 className="text-gray-900 text-base leading-tight font-medium mb-2">
                FIltre par etage
            </h5>
            <div className='flex'>
                <input
                    type="text"
                    className="form-control block w-3/4 px-3 h-14 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Keyword"
                    onChange={(evt) => setKeywordEtage(evt.target.value)}
                />

                <button
                    className="login w-1/4 h-14 inline-block px-3 py-4 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={onFiltre}
                >
                    Filter
                </button>
            </div>
            
        </div>  
    )
}