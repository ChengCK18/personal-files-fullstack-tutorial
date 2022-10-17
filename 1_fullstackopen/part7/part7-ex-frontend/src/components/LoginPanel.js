import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notification from "./Notification";
import { setUser, loginUser } from '../reducers/userReducer';


const LoginPanel = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const notificationMsg = useSelector(state => state.notification);

    useEffect(() => {
        window.localStorage.getItem('loggedInUser') !== null &&
            dispatch(setUser(JSON.parse(window.localStorage.getItem('loggedInUser'))));
    }, []);


    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginUser(username, password))
    };



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


export default LoginPanel