import { useState } from "react"

const Blog = ({ blog }) => {

    const [viewDetails, setViewDetails] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
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
                {blog.title} <b>by</b> {blog.author} <button type='button' onClick={() => { setViewDetails(!viewDetails) }}>Hide</button>
                <p>URL {'=>'} {blog.url}</p>
                <p>Likes {'=>'} {blog.likes}</p>
                <p>{blog.user.name}</p>
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