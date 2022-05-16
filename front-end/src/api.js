import store from "./reducer";

const backend_url = "http://localhost:3001"
const apiEnpoint = backend_url+"/api/"
const headers = {
    'Content-Type': 'application/json'
}

export const get = (path, auth = true) => {
    if(auth) headers['x-access-token'] = store.getState().token
    const r = fetch(apiEnpoint+path, {
         method: 'GET',
         headers: headers
    }).then(
      function(response) {
          return response.json()
        }
    ).then(
      (responseJson) => {
        return responseJson;
      }
    )
    return r;
}

export const post = async (path, data, auth = true) => {
    if(auth) headers['x-access-token'] = store.getState().token
    const r = fetch(apiEnpoint+path, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
   }).then(
     (response) => response.json()
   ).then(
     (responseJson) => {
       return responseJson;
     }
   )
   
   return r;
}

export const onDelete = (path, data) => {
    headers['x-access-token'] = store.getState().token
    const r = fetch(apiEnpoint+path, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
   }).then(
     (response) => response.json()
   ).then(
     (responseJson) => {
       return responseJson;
     }
   )
   return r;
}
export const update = (path, data) => {
    headers['x-access-token'] = store.getState().token
    const r = fetch(apiEnpoint+path, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
   }).then(
     (response) => response.json()
   ).then(
     (responseJson) => {
       return responseJson;
     }
   )
   return r;
}