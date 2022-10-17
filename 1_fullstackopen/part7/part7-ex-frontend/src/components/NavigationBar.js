import { Link } from "react-router-dom"

const NavigationBar = () => {
    const NavTempStyle = {
        'background-color': 'cyan'
    }
    return (
        <div style={NavTempStyle}>
            <Link to='/'>Blogs</Link>
            &ensp;
            <Link to='/users'>Users</Link>
        </div>
    )
}

export default NavigationBar