import BlogPanel from './components/BlogPanel';
import LoginPanel from './components/LoginPanel';
import './index.css';
import { useSelector } from 'react-redux';



const App = () => {
    const user = useSelector(({ notification, blog, user }) => {
        return user;
    });

    return (
        <div>
            {user === null && <LoginPanel />}
            {user !== null && <BlogPanel />}
        </div>
    );
};

export default App;
