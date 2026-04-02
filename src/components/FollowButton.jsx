import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

function FollowButton({ postId }) {
  const [follow, setFollow] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleFollow = async() =>{
    if(!user){
      toast.error('please login to follow users')
    }
    try {
      const resp = await API.post('/user/follow',{
        currentUserId:user._id,
         followingUserId : postId 
      })
      if(resp.data.success){
        setFollow(!follow);
        console.log(resp.data.message)
        toast.success(resp.data.message)
      }
      
    } catch (error) {
      toast.error('Failed to follow user')
    }
  }
  return (
    <button
      className={`btn btn-sm ${follow ? "btn-secondary" : "btn-primary"}`}
      onClick={handleFollow}
    >
      {follow ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;