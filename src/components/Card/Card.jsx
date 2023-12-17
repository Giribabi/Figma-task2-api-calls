import pic from '../../assets/default-pic.png'
import Loader from '../loader/Loader';
import { useState } from 'react';
import './Card.css'

function Card({username,image,job,email,bio}){

    const [loading, setLoading] = useState(true);
    function handleImageError(e){
        e.target.src=pic
    }
    function showLoader(){
        return (<Loader/>)
    }
    return (
        <div className="user-info">
            {console.log(job)}
            <div className="profile-picture">
            <div style={{display: loading ? "block" : "none"}}>
                {showLoader()}
                </div>
                <div style={{display: loading ? "none" : "block"}}>
                <img src={image? image: pic} className='image' onLoad={()=>setLoading(false)} onError={handleImageError} alt="profile_image" height="120px" width="120px"/>
                </div>
            </div>
            <div className="username">
                {"@"+username}
            </div>
            <div className="job_des">
                <div className='job-head'>Job Title:</div> 
                {job}
            </div>
            <div className="bio">
               <div className='bio-head'> Bio: </div>
               {bio}
            </div>
            <div className="email">
                <div className='email-head'>email:</div> 
                {email}
            </div>
        </div>
    )
}
export default Card