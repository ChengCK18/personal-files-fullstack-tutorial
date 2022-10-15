


const UserInfoBlogCount = ({blogsGroupByUserName,userSelectedToggleButton}) =>{
    console.log(blogsGroupByUserName)
    if(blogsGroupByUserName.length !== 0){
        return (
            <div>
                <h2>Users</h2>
                <table>
                <tbody >
                    {blogsGroupByUserName.map((item, index) => {
                        return (
                            
                                <tr key={'userInfo_'+index}>
                                    <td onClick={userSelectedToggleButton}>{item[0]}</td>
                                    <td>{item[1]}</td>
                                </tr>         
                        )
                    })}
                    </tbody>
                </table>
        
        
            </div>)
    }
    return <></>
    
}

export default UserInfoBlogCount
