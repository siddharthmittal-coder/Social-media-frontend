import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
function CommentBox({comments = [], setComments, postId}) {
  const [text, setText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  
  const handleComment = async() => {
    if(!user){
      alert('Please login to comment on the post')
      return;
    }
     const resp = await API.post('/post/comment',{
      postId :postId,
      userId : user._id,
      text:text
     })
     console.log(user);
     console.log(resp.data.comments)
     setComments(resp.data.comments)
     setText('')
    };

  return (
    <div className="mt-2">
      <input
        className="form-control"
        placeholder="Add comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="btn btn-sm btn-primary mt-1" onClick={handleComment}>
        Comment
      </button>

      {comments.map((c, i) => (
        <p key={i}>
          <b>{c.username || "User"}:</b> {c.text}
        </p>
      ))}
    </div>
  );
}

export default CommentBox;
