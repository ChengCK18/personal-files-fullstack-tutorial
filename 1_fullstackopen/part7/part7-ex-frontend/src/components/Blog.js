import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { blogComment } from '../reducers/blogReducer';
import Notification from './Notification';

const Blog = ({ blog, user, handleAddLike, handleDeleteBlog }) => {
    const dispatch = useDispatch()
    const notificationMsg = useSelector(state => state.notification)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        marginBottom: 25
    }

    const [userComment, setUserComment] = useState('')

    const addLike = () => { //Better solution would be backend take list of objectid of users that liked and count them. To check and avoid multiple likes from same user

        handleAddLike({
            blogIdArg: blog.id,
            blogTitleArg: blog.title,
            blogAuthorArg: blog.author,
            blogUrlArg: blog.url,
            blogLikeArg: blog.likes

        })

    }

    const deleteBlog = () => {
        if (window.confirm(`Remove blog - ${blog.title} by ${blog.author}`)) {
            handleDeleteBlog(blog.id)
        }
    }
    const showDeleteButton = () => {
        return (<p><button style={{ backgroundColor: 'red' }} type='button' onClick={deleteBlog}>Delete</button></p>)
    }

    const handleCommentChange = (event) => {
        setUserComment(event.target.value)
    }

    const handlePostComment = () => {
        dispatch(blogComment(user, blog.id, userComment))
        setUserComment('')

    }

    return (
        <div style={blogStyle} className='detailedView'>

            <h1>{blog.title} <b>by</b> {blog.author}</h1>
            <p>URL {'=>'} {blog.url}</p>
            <p>Likes {'=>'} {blog.likes} <button type='button' onClick={addLike}>Like</button></p>
            <p>{blog.user.name}</p>

            {blog.user.username === user.username ? showDeleteButton() : null}
            <br />
            <Notification message={notificationMsg} />
            <input type="text"
                id='blog_comment_input'
                value={userComment}
                name="blogComment"
                placeholder='Comment here'
                onChange={handleCommentChange}
            />
            <button onClick={handlePostComment}>Post</button>

            <h3>Comments</h3>
            <ul>
                {blog.comments.map((comment, index) => <li key={blog.id + '_cmt' + index}>{comment}</li>)}
            </ul>
        </div>
    )

}




export default Blog