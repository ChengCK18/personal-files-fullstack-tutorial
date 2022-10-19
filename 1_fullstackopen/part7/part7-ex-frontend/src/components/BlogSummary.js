import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const BlogSummary = () => {
    const blogs = useSelector(state => state.blog)
    let sortableBlogs = [...blogs];

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 25
    }


    return (
        <div>
            {sortableBlogs
                .sort((a, b) => {
                    return b.likes - a.likes;
                })
                .map((blog) => (
                    <div key={'blogSummary_' + blog.id} style={blogStyle} className='summaryView'>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title} <b>by</b> {blog.author}
                        </Link>
                    </div>
                ))}



        </div>

    )
}

export default BlogSummary