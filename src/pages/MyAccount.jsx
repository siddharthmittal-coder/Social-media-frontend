import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbArrowsCross } from "react-icons/tb";
function MyAccount() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token');
  const {userId} = useParams();
  const [userData,setUserData] = useState(null);
  const [post,setPosts] = useState([]);
  const [commentText,setCommentText] = useState('');
  const [playingId,setPlayingId] = useState(null);
   const handlePlay = (p) =>{
    const audioElement = document.getElementById(`audio-${p._id}`);
    if(!audioElement){
      return toast.error('Audio element not found')
    }
    if(playingId === p._id){
      audioElement.pause();
      setPlayingId(null);
    } else{
      audioElement.play();
      setPlayingId(p._id);
    }
  }
   const handleComment = async(postId) => {
    if(!user){
      alert('Please login to comment on the post')
      return;
    }
     const resp = await API.post('/post/comment',{
      postId :postId,
      userId : user._id,
      text: commentText
     })
     setPosts((prevPosts) =>
    prevPosts.map((p) =>
      p._id === postId
        ? { ...p, comments: resp.data.comments }
        : p
    )
  );

  setCommentText('');
    };
  const handleLike = async(postId) => {
      if(!user){
        alert('Please login to like the post')
        return;
      }
     const resp = await API.post('/post/like',{
      postId:postId,
      userId : user._id
     })
    setPosts((prevPosts) =>
    prevPosts.map((p) =>
      p._id === postId
        ? { ...p, likes: resp.data.likes } // sirf us post ka likes update
        : p
    )
  );
    };
  useEffect(() =>{
    API.get(`/post/profile/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((resp) =>{
      setUserData(resp.data.user);
      setPosts(resp.data.posts);
      console.log(resp.data);
    })
    
  },[userId,token])
  return (
    <>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'1rem'}}>
    <button style={{height:'2px',width:'2px',marginLeft:'0.5rem',color:'black'}} onClick={() => navigate(-1)}><FaArrowLeft /></button>
    <button onClick={() =>{
      localStorage.removeItem('user');
      localStorage.removeItem('token')
      navigate('/');
      toast.success('Logged out successfully');
    }}  type="button" className="btn btn-primary">Logout</button>
    </div>
      {userData && (
        <div className='mt-6  h-full w-full'>
        <p className='ml-3 mt-2 font-bold'>{userData.name}</p>
        <div className='flex align-center gap-5'>
          <img className='rounded-circle mb-2' style={{height:'5rem',width:'5rem',border:'1px solid black'}} src={userData.image} alt="" />
           
          <div className='flex gap-6 mt-3'>
            <p>Posts: <span className='font-bold'>{post.length}</span></p>
            <p>Followers: <span className='font-bold'>{userData.followers?.length || 0}</span></p>
            <p>Following: <span className='font-bold'>{userData.following?.length || 0}</span></p>
          </div>
         
        </div>
        
      </div>
      
      )}
      <div className='flex gap-12 mt-2.5'>
      <div>
            <button type="button" className="btn btn-primary">Edit Profile</button>
          </div>
          <div className='flex gap-12 align-center justify-center mb-4'>
            <button type="button" className="btn btn-primary">Follow</button>
            <button type="button" className="btn btn-primary">Message</button>
          </div>
          </div>
      {/* User posts */}
      <div className='mt-3 ml-3 flex gap-3 flex-wrap'>
        {post.map((p) =>(
         <div key={p._id} className="card" style={{width: '20rem',height:'20rem',padding:'0.5rem',overflow:'auto'}}>
         
          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <BsThreeDotsVertical />
          </a>
          <ul class="dropdown-menu">
            <li className='flex mt-2 ml-3 justify-center align-center '>
              <div className='mt-1.5 ml-1'>
                <FaFacebook />
              </div>
              <a class="dropdown-item" href="#">Share to Facebook</a></li>
            <li className='flex mt-2 ml-3 justify-center align-center '>
              <div className='mt-1.5 ml-1'>
                 <MdOutlineWatchLater />
              </div>
              <a class="dropdown-item" href="#">Archieve</a></li><li className='flex mt-2 ml-3 justify-center align-center '>
              <div className='mt-1.5 ml-1'>
              <FiEdit2 />
              </div>
              <a class="dropdown-item" href="#">Edit</a></li><li className='flex mt-2 ml-3 justify-center align-center '>
              <div className='mt-1.5 ml-1'>
                <AiOutlineDelete />
              </div>
              <a class="dropdown-item" href="#">Delete</a></li><li className='flex mt-2 ml-3 justify-center align-center '>
              <div className='mt-1.5 ml-1'>
                <TbArrowsCross />
              </div>
              <a class="dropdown-item" href="#">Create a cutout sticker</a></li>
          </ul>
        </li>
         
  <div className="card-body " style={{display:'flex',alignItems:'center',gap:'1rem'}}>
    
    {
      p.UserProfilePic? (
      <img className='rounded-circle ' style={{height:'4rem',width:'4rem'}} src={p.UserProfilePic} alt="" />
      ) : (
        <div
        style={{ borderRadius:'50%',height:'40px',width:'40px',border:'1px solid gray',textAlign:'center',fontWeight:'bolder',display:'flex',alignItems:'center',justifyContent:'center'}}
        >{p.username.charAt(0).toUpperCase()} </div>
      )
    }
     <div className='mb-1'>
      
     <h5 className="card-title " style={{fontSize:'1rem'}}>{p.username}</h5>
     <small className="posttime">{`${new Date(p.createdAt).toDateString()},${new Date(p.createdAt).toLocaleTimeString()}`}</small>
     {p.audio && (<p>{p.audioName}</p>)}
     <audio id={`audio-${p._id}`} src={p.audio} controls></audio>
    </div>
    
  </div>
   <p className='font-bold ml-1'>{p.content}</p>
    <img src= {p.image} className="card-img-top" style={{height:'25rem',width:'25rem'}} />
    <button onClick={() => handleLike(p._id)} className="btn btn-outline-danger">
        ❤️ {p.likes?.length || 0}
      </button>
      {p.audio && (
  <button onClick={() => handlePlay(p)} className="btn btn-outline-dark">
    {playingId === p._id ? "⏸️ Pause" : "▶️ Play"}
  </button>
)}
       <input
        className="form-control"
        placeholder="Add comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        
      />

      <button style={{marginTop:'0.6rem'}} className="btn btn-sm btn-primary " onClick={() => handleComment(p._id)}>
        Comment
      </button>
    {
      p.comments?.map((c,i) =>(
      <div key={i} style={{borderBottom:'1px solid black'}}> <b>{c.username || "User"}:</b> {c.text}</div>
      ))
    }
      <p> Comments : {p.comments?.length || 0}</p>
</div>

        ))}
       
      </div>
    </>
  )
}

export default MyAccount
