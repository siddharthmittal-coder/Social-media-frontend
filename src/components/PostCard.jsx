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
    <div id={post._id} className="card p-3 mb-3">
      <div className="d-flex justify-content-between">
        <h6>{post.username}</h6>
        
        <FollowButton />
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
