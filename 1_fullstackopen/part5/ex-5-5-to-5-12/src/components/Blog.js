import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, updateBlogsData }) => {

    const [viewDetails, setViewDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }



    const toggleView = () => {
        setViewDetails(!viewDetails)
    }
    const addLike = async () => { //Better solution would be backend take list of objectid of users that liked and count them. To check and avoid multiple likes from same user
        await blogService.likeFunc({
            user: user,
            blogId: blog.id,
            blogTitle: blog.title,
            blogAuthor: blog.author,
            blogUrl: blog.url,
            blogLike: blog.likes + 1
        })
        updateBlogsData() //trigger to update the list of blogs with updated 'like' value

    }

    const handleDeleteBlog = async () => {
        if (window.confirm(`Remove blog - ${blog.title} by ${blog.author}`)) {
            await blogService.deleteBlog({ user: user, blogId: blog.id })
        }
        updateBlogsData() //trigger to update the list of blogs without the removed blog
    }
    const showDeleteButton = () => {
        return (<p><button style={{ backgroundColor: 'red' }} type='button' onClick={handleDeleteBlog}>Delete</button></p>)
    }

    const summaryView = () => {
        return (
            <div style={blogStyle}>
                {blog.title} <b>by</b> {blog.author} <button type='button' onClick={() => { setViewDetails(!viewDetails) }}>View</button>
            </div>
        )
    }

    const detailedView = () => {
        return (

            <div style={blogStyle}>

                {blog.title} <b>by</b> {blog.author} <button type='button' onClick={toggleView}>Hide</button>
                <p>URL {'=>'} {blog.url}</p>
                <p>Likes {'=>'} {blog.likes} <button type='button' onClick={addLike}>Like</button></p>
                <p>{blog.user.name}</p>
                {blog.user.username === user.username ? showDeleteButton() : null}
            </div>
        )

    }

    return (
        <div>

            {!viewDetails && summaryView()}
            {viewDetails && detailedView()}
        </div>
    )

}




export default Blog