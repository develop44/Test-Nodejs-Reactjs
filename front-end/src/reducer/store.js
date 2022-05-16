
const defaultState = {
    roles: [],
    user: null,
    token: null,
    places: null,
    users: [],
    auth: false
};


export default function store(state = defaultState, action) {
  switch (action.type) {
    case 'LOANDING':
      return { ...state, loading: state.loading };
    case 'SET_ROLES':
      return { ...state, roles: action.roles };
    case 'SET_CURENT_USER':
      return { ...state, user: action.user };
    case 'SET_CURENT_TOKEN':
      return { ...state, token: action.token };
    case 'SET_PLACES':
      return { ...state, places: action.places };
    case 'SAVE_USER':
      return { ...state, users: action.users };
    case 'SET_AUTH':
      return { ...state, auth: action.auth ? action.auth : true };
    case 'ADD_PLACE':
      let places = state.places || []
      if(!places.find(place => place.id === action.place.id)){
        places.push(action.place)
      }else{
        places = places.map(place =>{
          if(place.id !== action.place.id){
            return place
          }
          return {...action.place}
        })
      }
      return { ...state, places: [...places] };
    default:
      return {...state};
  }
}