import { get, onDelete, post, update } from "./api"
import store from "./reducer"

export const getRoles = async() => {
    try {
        const result = await get("role", false)
        if(result && !result.error) store.dispatch({type: "SET_ROLES", roles: result.data})
    } catch (error) {
        console.log('error get role', error)
    }
}
export const createUser = async(data) => {
    try {
        const result = await post("user", data,  false)
        console.log('result result', result)
        if(result && !result.error){
            return result.data
        } 
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const getUser = async() => {
    try {
        const result = await get("user")
        console.log('result result', result)
        if(result && !result.error){
            store.dispatch({type: "SAVE_USER", users: result.data})
            return result.data
        } 
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const deleteUser = async(id) => {
    try {
        const result = await onDelete("user/"+id)
        console.log('result result', result)
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const updateUser = async(id, data) => {
    try {
        const result = await update("user/"+id, data)
        console.log('result update user .............', result)
        if(result&&!result.error){
            store.dispatch({type: "SET_CURENT_USER", user: result.data})
        }
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const logout = async() => {
    try {
        const result = await update("user", {})
        console.log('result logout .............', result)
        if(result&&!result.error){
            store.dispatch({type: "SET_CURENT_USER", user: null})
            store.dispatch({type: "SET_CURENT_TOKEN", token: null})
            store.dispatch({type: "SET_AUTH", auth: false})
        }
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const getPlace = async(keyword) => {
    try {
        const path = keyword && keyword.trim() !== "" ? "place_parking/"+keyword : "place_parking"
        const result = await get(path)
        console.log('result result', result)
        if(result && !result.error){
            store.dispatch({type: "SET_PLACES", places: result.data})
            return result.data
        } 
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const updatePlace = async(id, data) => {
    try {
        const result = await update('place_parking/'+id, data)
        console.log('result result', result)
        if(result && !result.error){
            store.dispatch({type: "ADD_PLACE", place: result.data})
            return result.data
        } 
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const createPlace = async(data) => {
    try {
        const result = await post("place_parking", data)
        console.log('result result', result)
        if(result && !result.error){
            store.dispatch({type: "ADD_PLACE", place: result.data})
            return result.data
        } 
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}
export const login = async(data) => {
    try {
        const result = await post("user/login", data,  false)
        console.log('result result', result)
        if(result && !result.error){
            const userObject =  JSON.parse(
                decodeToken(result.token.split('.')[1].replace('-', '+').replace('_', '/'))
            )
            store.dispatch({type: "SET_CURENT_USER", user: userObject})
            store.dispatch({type: "SET_CURENT_TOKEN", token: result.token})
            store.dispatch({type: "SET_AUTH"})
            return true
        } 
        return result
    } catch (error) {
        console.log('error get role', error)
    }
}

const decodeToken = (str) => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), c =>'%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
}

