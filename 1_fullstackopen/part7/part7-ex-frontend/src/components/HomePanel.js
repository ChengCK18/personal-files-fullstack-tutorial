import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import Togglable from "./Togglable";
import BlogForm from './BlogForm'
import BlogSummary from './BlogSummary'
import Blog from "./Blog";
import { initializeBlogs, blogCreation, blogDeletion, blogLikeAdditon } from '../reducers/blogReducer';
import { logoutUser } from '../reducers/userReducer';
import UserInfoTable from "./UserInfoTable";


import {
    Routes,
    Route,
    Link,
    useMatch

} from "react-router-dom"

const HomePanel = () => {
    const dispatch = useDispatch();
    const user = useSelector(({ notification, blog, user }) => {
        return user;
    });


    const blogs = useSelector(({ notification, blog, user }) => {
        return blog;
    });

    const notificationMsg = useSelector(({ notification, blog, user }) => {
        return notification;
    });
    let sortableBlogs = [...blogs];
    const [blogTitle, setBlogTitle] = useState('');
    const [blogAuthor, setBlogAuthor] = useState('');
    const [blogUrl, setBlogUrl] = useState('');

    const blogToggleRef = useRef();


    useEffect(() => {
        updateBlogsData();
    }, [user]);

    const handleLogout = () => {
        dispatch(logoutUser());
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

    const updateBlogsData = () => {
        dispatch(initializeBlogs(user));
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


    const defaultMainView = () =>{
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
                    <BlogSummary
                        key={blog.id}
                        blog={blog}
                        user={user}
                        updateBlogsData={updateBlogsData}
                        handleAddLike={handleAddLike}
                        handleDeleteBlog={handleDeleteBlog}
                    />
                ))}
                </div>

        )
    }

    const match = useMatch('/blogs/:id')

    const specificBlog = match
        ? blogs.find(blog => blog.id === match.params.id)
        : null

 
    const specificBlogView = () =>{
        if(specificBlog !== null && specificBlog !== undefined){
            return (
                <Blog
                        key={specificBlog.id}
                        blog={specificBlog}
                        user={user}
                        updateBlogsData={updateBlogsData}
                        handleAddLike={handleAddLike}
                        handleDeleteBlog={handleDeleteBlog}
                    />
            )
        }
    }

    return (
        <div>
            <Routes>
                <Route path='/users' element={<UserInfoTable />}/>
                <Route path='/' element={defaultMainView()}/>
                <Route path='/blogs/:id' element={specificBlogView()}/>
            </Routes>
            
            
        </div>
    );
};


export default HomePanel