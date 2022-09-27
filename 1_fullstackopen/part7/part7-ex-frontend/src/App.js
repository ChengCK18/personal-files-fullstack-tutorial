import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

import './index.css';
import Togglable from './components/Togglable';

import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from './reducers/notificationReducer';
import { initializeBlogs, blogCreation, blogDeletion, blogLikeAdditon } from './reducers/blogReducer';
import { setUser, loginUser, logoutUser } from './reducers/userReducer';


const App = () => {
    const notificationMsg = useSelector(({ notification, blog, user }) => {
        return notification;
    });

    const blogs = useSelector(({ notification, blog, user }) => {
        return blog;
    });

    const user = useSelector(({ notification, blog, user }) => {
        return user;
    });


    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //For blog creation form Starts
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');
    //For blog creation form Ends


    const blogToggleRef = useRef();

    useEffect(() => {
        updateBlogsData();
    }, [user]);

    useEffect(() => {
        window.localStorage.getItem('loggedInUser') !== null &&
            dispatch(setUser(JSON.parse(window.localStorage.getItem('loggedInUser'))));
    }, []);

    const updateBlogsData = () => {
        dispatch(initializeBlogs(user));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginUser(username, password))
    };

    const handleCreateBlog = async (event) => {
        event.preventDefault();
        blogToggleRef.current.toggleVisibility();
        dispatch(blogCreation(user, blogTitle, blogAuthor, blogUrl))
    };
    const handleCancelBlog = () => {
        blogToggleRef.current.toggleVisibility();
    };

    const handleDeleteBlog = async (blogIdArg) => {
        dispatch(blogDeletion(user, blogIdArg))
    };

    const handleAddLike = async ({
        blogIdArg,
        blogTitleArg,
        blogAuthorArg,
        blogUrlArg,
        blogLikeArg
    }) => {
        dispatch(blogLikeAdditon(user, blogIdArg, blogTitleArg, blogAuthorArg, blogUrlArg, blogLikeArg))
    };

    const getAuthorBlogsCreatedCount = () => {
        console.log(blogs)
    }

    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <h1>Login to the application</h1>
                <Notification message={notificationMsg} />
                <div>
                    Username:{' '}
                    <input
                        type="text"
                        id="username_input"
                        value={username}
                        name="Username"
                        onChange={({ target }) => {
                            setUsername(target.value);
                        }}
                    />
                </div>
                <div>
                    Password:{' '}
                    <input
                        type="password"
                        id="password_input"
                        value={password}
                        name="Password"
                        onChange={({ target }) => {
                            setPassword(target.value);
                        }}
                    />
                </div>
                <button type="submit" id="login_button">
                    Login
                </button>
            </form>
        );
    };
    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const blogPanel = () => {
        let sortableBlogs = [...blogs];
        return (
            <div>
                <h2>blogs</h2>
                <p>
                    {user.name} is logged in.{' '}
                    <button onClick={handleLogout}>Logout</button>
                </p>
                <Notification message={notificationMsg} />
                <Togglable
                    buttonLabel="Create new blog"
                    buttonLabelHide="Create new blog"
                    ref={blogToggleRef}
                >
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
                {sortableBlogs
                    .sort((a, b) => {
                        return b.likes - a.likes;
                    })
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            updateBlogsData={updateBlogsData}
                            handleAddLike={handleAddLike}
                            handleDeleteBlog={handleDeleteBlog}
                        />
                    ))}
            </div>
        );
    };
    getAuthorBlogsCreatedCount()
    return (
        <div>
            {user === null && loginForm()}
            {user !== null && blogPanel()}
        </div>
    );
};

export default App;