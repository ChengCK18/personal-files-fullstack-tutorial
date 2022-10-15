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
            <table>
            <tbody >
                {blogsGroupByUserName.map((item, index) => {

                    return (
                        
                            <tr key={'userInfo_'+index}>
                                <td>{item[0]}</td>
                                <td>{item[1]}</td>
                            </tr>
                        
                            // <div key={'userInfo_'+index}>{item[0]} == {item[1]}</div>
                        
                    
                    )
                })}
                </tbody>
            </table>


        </div>
    )
}

export default UserInfo