import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () =>{
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
      }
    return request.then(response => {
        console.log(response.data)
        return response.data.concat(nonExisting)
    })

}

const create = newObject =>{
    const request =  axios.post(baseUrl,newObject)
    return request.then (response => response.data)
}

const update = (id,newObject) => {
    
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response => response.data)
}


/*
const notesServices = {
    getAll: getAll, 
    create: create, 
    update: update 
}
*/
//since name of the object is the same, we can just do this. ES6 feature
const notesServices = {
    getAll,
    create,
    update
}
export default notesServices