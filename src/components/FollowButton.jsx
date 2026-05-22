import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

function FollowButton({ postId }) {
  const [follow, setFollow] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() =>{
      if(user && postId){
        setFollow(user.following?.includes(postId));
      }
    },[user, postId])
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
        let updatedUser = {...user};
        if(follow){
          updatedUser.following = updatedUser.following.filter(id => id !== postId);
        } else{
          updatedUser.following = [...(updatedUser.following || []), postId];
        }
        localStorage.setItem('user',JSON.stringify(updatedUser));
        setFollow(!follow);
        
        console.log(resp.data.message)
        toast.success(resp.data.message)
      } else{
        toast.error(resp.data.message)
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