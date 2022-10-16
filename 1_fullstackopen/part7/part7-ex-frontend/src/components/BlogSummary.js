import { Link } from "react-router-dom"

const BlogSummary = ({blog}) =>{

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 25
    }


    return (
        <div style={blogStyle} className='summaryView'>
                
                <Link to={`/blogs/${blog.id}`}>
                {blog.title} <b>by</b> {blog.author}
                </Link>
                
                
        </div>
    )
}

export default BlogSummary