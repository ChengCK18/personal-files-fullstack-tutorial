import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const NavigationBar = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const NavTempStyle = {
        'backgroundColor': '#979A9A'
    }

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div style={NavTempStyle}>
            <p>

            </p>
            <Link to='/'>Blogs</Link>&ensp;

            <Link to='/users'>Users</Link>&ensp;
            {user.name} is logged in.{' '}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default NavigationBar