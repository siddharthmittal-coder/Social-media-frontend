import { useState } from "react";

function SearchBar({post}) {
  const [serach,setSearch] = useState('')
  const handleSearch = () =>{
    const foundPost = post.find((p) => p.username.toLowerCase() === serach.toLowerCase());
    if(foundPost){
      const element = document.getElementById(foundPost._id);
      element?.scrollIntoView({behavior:'smooth'})
    }
    else{
      alert('No post found with this username')
    }
  }
  return (
    <div style={{display:'flex',gap:'0.75rem',marginBottom:'1rem'}}>
      <input
      value={serach}
      onChange={(e) => setSearch(e.target.value)}
        className="form-control"
        placeholder="Search promotions, users, posts..."
      />
      <button onClick={handleSearch} className="btn btn-primary">🔍</button>
    </div>
  );
}

export default SearchBar;