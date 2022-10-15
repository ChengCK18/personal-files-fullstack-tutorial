import { useSelector } from "react-redux"


const UserInfoSelected = ({userSelected}) =>{
    const blogs = useSelector(state => state.blog)
    const blogsBySelectedUser = blogs.filter(item => item.user.name === userSelected)

    return(

        <div>
            <h1>{userSelected}</h1>
            <h3>Added Blogs</h3>
            <ul>
                {blogsBySelectedUser.map((item, index) =>{
                    return (<li key={'UserInfoSelected_'+index}>{item.title}</li>)
                })}
            </ul>
        </div>

    )
}


export default UserInfoSelected
