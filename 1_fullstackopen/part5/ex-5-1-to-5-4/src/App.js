import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])


    const handleLogin = (event) => {
        event.preventDefault()
        console.log('Button presseddddd')
        try {

        } catch (error) {

        }

    }
    console.log(username)
    console.log(password)

    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <h1>Login to the application</h1>
                <div>
                    Username: <input type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => { setUsername(target.value) }} />
                </div>
                <div>
                    Password: <input type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => { setPassword(target.value) }} />
                </div>
                <button type='submit'>Login</button>
            </form>
        )
    }

    const blogPanel = () => {
        return (
            <div>
                <h2>blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        )

    }

    // return (
    //     <div>
    //         <h2>blogs</h2>
    //         {blogs.map(blog =>
    //             <Blog key={blog.id} blog={blog} />
    //         )}
    //     </div>
    // )


    return (
        <div>
            {user === null && loginForm()}
            {user !== null && blogPanel()}
        </div>

    )
}

export default App
