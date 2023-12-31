import pic from '../../assets/default-pic.png'
import Loader from '../loader/Loader';
import Card from '../Card/Card';
import { useEffect, useState } from 'react'
import './UsersData.css';

function UsersData(){
    const [usersList,setUsersList] = useState([])
    const [mode,switchMode] = useState("light")
    const [isLoading,setIsLoading] = useState(false)
    const [isUserSelected,setSelectedUser] = useState(false)
    const [error,setError] = useState(false)

    const [image,setImage] = useState(pic)
    const [username,setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [job, setJob] = useState("")
    const [mail,setMail] = useState("")

    function handleMode(){
        console.log(mode)
        if(mode==='light')
        switchMode("dark")
        else
        switchMode("light")
    }
    useEffect(()=>{
        async function fetchUsers(){
            setIsLoading(true)
            try{
                const response = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
                const usersList = await response.json()
                //console.log(usersList)
                setUsersList(usersList)
            }
            catch(err){
                console.log(err)
                setError(true)
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchUsers()
    },[])
    if(error){
        return (<div className='no-info' style={{backgroundColor : "orange"}}>
            No information to be displayed due to data error
        </div>)
    }
    function handleImageError(e){
        e.target.src = pic
    }
    return (
    <div className='data'>
    <div className="theme-button" onClick={handleMode}>
        Switch Mode
    </div>
    <div className='data-container'
    style={{backgroundColor: mode==="dark"? "darkgrey" : "white"}}>
        <div className='users'>
            <div className="heading">
                USERS LIST
            </div>
            <div className="users-list">
                {
                    isLoading?
                    <Loader/>
                    :
                    usersList.map((user)=>(
                            <div
                            className='user-item'
                            style={{border: "2px solid grey", color : mode==="dark"? "white": "black", backgroundImage : mode==="dark"? "linear-gradient(to bottom right, grey,black)": "linear-gradient(to bottom right, rgb(236, 233, 233),rgb(113, 112, 112))"}} 
                            key={`${user.id}-${user.createdAt}`}
                            onClick={()=>{
                                console.log(user)
                                setImage(user.avatar)
                                setBio(user.Bio)
                                setJob(user.jobTitle)
                                setMail(user.profile.email)
                                setUsername(user.profile.username)
                                setSelectedUser(true)
                            }}
                            >
                                <div>
                                    <img 
                                    src={user.avatar? user.avatar: pic} 
                                    onError={handleImageError}
                                    alt="profile_image" 
                                    height="50px" width="50px"
                                    className='image'
                                    style={{border: "none",margin:"3px"}}/>
                                </div>
                                <div className='name'>
                                    {user.profile.firstName+" "+user.profile.lastName}
                                </div>
                            </div>
                    ))
                }
            </div>
        </div>
        <div className="user-profile">
        {
            isUserSelected?
            <Card
            image={image}
            email={mail}
            job={job}
            bio={bio}
            username={username}
            />
            :
            <div className="no-info">
                No information to be displayed
            </div>
        }
        </div>
    </div>
    </div>)
}
export default UsersData
