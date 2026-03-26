import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

function CreatePost({fetchPosts}) {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
const user = JSON.parse(localStorage.getItem('user'))
  const handlePost = async() => {
    try {
      const resp = await API.post('/post/createpost',{
        userId:user._id,
        content:text,
        image
      })
      fetchPosts();
      toast.success(resp.data.message)
      setText('');
      setImage('')
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Create Post</h5>

      <textarea
        className="form-control mb-2"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;