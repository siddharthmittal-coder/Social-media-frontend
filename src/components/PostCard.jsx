import { useState } from "react";
import CommentBox from "./CommentBox";
import FollowButton from "./FollowButton";
import API from "../api";
import { toast } from "react-toastify";

function PostCard({ post }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments || []);

  const handleLike = async() => {
    if(!user){
      alert('Please login to like the post')
      return;
    }
   const resp = await API.post('/post/like',{
    postId :post._id,
    userId : user._id
   })
   setLikes(resp.data.likes)
  };
  

  return (
    <div id={post._id} className="card" style={{padding:'0.75rem',marginBottom:'0.75rem'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'0.5rem',gap:'0.3rem'}}>
        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
          {/* In image src tag only used image urls image src tag not used any name or alphabet so we used nested condition */}
          {
            post.UserProfilePic ? (<img src={post.UserProfilePic  } alt=""  style={{borderRadius:'50%',width:'40px',height:'50px',objectFit:'cover'}} />) : (<div  style={{ borderRadius:'50%',height:'40px',width:'40px',border:'1px solid gray',textAlign:'center',fontWeight:'bolder',display:'flex',alignItems:'center',justifyContent:'center'}}> {post.username.charAt(0).toUpperCase()}</div>)
          }
        
       <h6>{post.username}</h6>
        </div>
        <div>
        <FollowButton postId = {post.userId} />
      </div>
      </div>
     <small className="posttime">{`${new Date(post.createdAt).toDateString()},${new Date(post.createdAt).toLocaleTimeString()}`}</small>
      <p>{post.content}</p>
      {post.image && <img src={post.image} className="img-fluid" />}

      <button onClick={handleLike} className="btn btn-outline-danger">
        ❤️ {likes.length}
      </button>
      
      <CommentBox comments = {comments} setComments={setComments} postId = {post._id} />
      <p>{comments?.length || 0} comments</p>
    </div>
  );
}

export default PostCard;
