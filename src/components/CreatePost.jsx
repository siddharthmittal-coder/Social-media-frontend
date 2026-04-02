import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

function CreatePost({fetchPosts}) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
const user = JSON.parse(localStorage.getItem('user'))
  const handlePost = async() => {
    try {
      const formData = new FormData();
      formData.append('userId',user._id);
      formData.append('content',text);
      formData.append('image',image);
      const resp = await API.post('/post/createpost',formData)
      fetchPosts();
      toast.success(resp.data.message)
      setText('');
      setImage('')
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

      <button className="btn btn-primary" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;