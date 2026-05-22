import React from 'react'
import { GoHome } from "react-icons/go";
import { BsCameraReels } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FiSend } from "react-icons/fi";
import { useNavigate, useParams } from 'react-router-dom';
import MyAccount from '../pages/MyAccount';
function Footer() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const {userId} = useParams();
  return (
    <div className='w-full h-12 bg-amber-50 flex justify-evenly align-center px-4 fixed bottom-0.5 '>
    <div className='h-10 mt-3 '><GoHome /></div>
    <div className='h-10 mt-3'><BsCameraReels /></div>
    <div className='h-10 mt-3'><CiSearch /></div>
    <div className='h-10 mt-3'><FiSend /></div>
    {
      !user ? (null): (
        <img src={user.image} onClick={()=> navigate(`/profile/${user._id}`)} style={{borderRadius:'50%', height: '1.25rem', width: '1.25rem', marginTop: '1rem'}} alt="Profile" />
      )
    }
    </div>
  )
}

export default Footer
