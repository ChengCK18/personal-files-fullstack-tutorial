const Blog = ({ blog }) => (
    <div>
        {blog.title} <b>by</b> {blog.author}
    </div>
)

export default Blog