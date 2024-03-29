import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = ({ user }) => {

    const config = {
        headers: { 'Authorization': `bearer ${user.token}` }
    };
    const request = axios.get(baseUrl, config)


    return request.then(response => {
        return response.data
    })
}


const createBlog = ({ user, blogTitle, blogAuthor, blogUrl }) => {
    const config = {
        headers: {
            'Authorization': `bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    };
    const content = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
    }

    const request = axios.post(baseUrl,
        content,
        config)

    return request.then(response => {
        console.log('response.data', response.data)
        return response.data
    })

}






export default { getAll, createBlog }