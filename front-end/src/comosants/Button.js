
export default function Button(props) {
    return (
        <button 
            className="login inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"                                    
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            {...props}
            onClick={() =>props.next()}
        >
            {props.title}
        </button>
        
    )
}