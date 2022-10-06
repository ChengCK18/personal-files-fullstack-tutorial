import { useSelector } from "react-redux"
const _ = require("lodash");

const UserInfo = () => {
    const blogs = useSelector(({ notification, blog, user }) => {
        return blog
    })

    let blogsGroupByUserName = Object.entries(_.countBy(blogs, 'user.name'))

    return (
        <div >
            <h2>Users</h2>
            {blogsGroupByUserName.map((item, index) => {

                return (<div>{item[0]} == {item[1]}</div>)
            })}


        </div>
    )
}

export default UserInfo