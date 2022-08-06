import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [notificationMsg, setNotificationMsg] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const [user, setUser] = useState(null)

    const blogToggleRef = useRef()

    const updateBlogsData = () => {
        if (user !== null) {
            blogService.getAll({ user }).then(blogs =>
                setBlogs(blogs)
            )
        }

    }
    useEffect(() => {
        updateBlogsData()
    }, [user])

    useEffect(() => {
        window.localStorage.getItem('loggedInUser') !== null && setUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
    }, [])



    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await loginService.loginWithUsernameAndPass({ username, password })
            if (response.status === 401) {

                setNotificationMsg('Error => ' + response.data.error)
                setTimeout(() => {
                    setNotificationMsg(null)
                }, 5000)
            }
            else {
                window.localStorage.setItem(
                    'loggedInUser', JSON.stringify(response)
                )
                setUser(response)
            }

        }
        catch (error) {
            console.log('', error)
        }

    }
    const handleCreateBlog = async (event) => {

        event.preventDefault()
        try {
            await blogService.createBlog({ user, blogTitle, blogAuthor, blogUrl })
            const response = await blogService.getAll({ user })
            setNotificationMsg(`${blogTitle} by ${blogAuthor} has been added`)
            setTimeout(() => {
                setNotificationMsg(null)

            }, 5000)
            setBlogs(response)
            blogToggleRef.current.toggleVisibility()



        } catch (error) {
            setNotificationMsg('Error =>' + error.response.data.message)
            setTimeout(() => {
                setNotificationMsg(null)
            }, 5000)
            //console.log('error here ', error.response.data.message)
        }
    }
    const handleCancelBlog = () => {
        blogToggleRef.current.toggleVisibility()
    }




    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <h1>Login to the application</h1>
                <Notification message={notificationMsg} />
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
    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        window.localStorage.clear()
        setUser(null)
    }


    const blogPanel = () => {
        return (
            <div>
                <h2>blogs</h2>
                <p>{user.name} is logged in. <button onClick={handleLogout}>Logout</button></p>
                <Notification message={notificationMsg} />
                <Togglable buttonLabel='Create new blog' buttonLabelHide='Create new blog' ref={blogToggleRef}>
                    <BlogForm
                        blogTitle={blogTitle}
                        setBlogTitle={setBlogTitle}
                        blogAuthor={blogAuthor}
                        setBlogAuthor={setBlogAuthor}
                        blogUrl={blogUrl}
                        setBlogUrl={setBlogUrl}
                        handleCreateBlog={handleCreateBlog}
                        handleCancelBlog={handleCancelBlog}
                    />
                </Togglable>
                {
                    blogs.sort((a, b) => {
                        return b.likes - a.likes
                    }).map(blog =>
                        <Blog key={blog.id} blog={blog} user={user} updateBlogsData={updateBlogsData} />
                    )}
            </div>
        )

    }


    return (
        <div>
            {user === null && loginForm()}
            {user !== null && blogPanel()}
        </div>

    )
}

export default App
