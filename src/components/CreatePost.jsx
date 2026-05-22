import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

function CreatePost({fetchPosts}) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  // const[selectSong,setSelectSong] = useState(null);
  // const [search,setSearch] = useState('');
  // const [song,setSong] = useState([]);
  const [audio,setAudio] = useState('');
const user = JSON.parse(localStorage.getItem('user'))
const handleSearch = async() =>{
  try {
    const resp = await API.get(`/post/search-song?q=${search}`)
  console.log(resp.data.songs);
  if(resp.data.success){
    setSong(resp.data.songs)
  } else{
    toast.error('Song not found')
  }
  
  } catch (error) {
     toast.error(error.message);
  }
  
}
  const handlePost = async() => {
    try {
      const formData = new FormData();
      formData.append('userId',user._id);
      formData.append('content',text);
      formData.append('image',image);
      formData.append('audio',audio);
     
      const resp = await API.post('/post/createpost',formData)
      fetchPosts();
      toast.success(resp.data.message)
      setText('');
      setImage('');
      setAudio('');
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="card p-3 " style={{marginBottom:'1.2rem'}}>
      <h5>Create Post</h5>

      <textarea
        className="form-control " style={{marginBottom:'1rem'}}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
       <label htmlFor="inputFile">Put your image from gallery to create post</label>
      <input onChange={(e) => setImage(e.target.files[0])} type="file" id="inputFile" className="form-control" required />
      <label htmlFor="inputFile">Select songs</label>
      <input onChange={(e) => setAudio(e.target.files[0])} type="file" accept="audio/*" id="inputFile" className="form-control"  />
      <button className="btn btn-primary" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;