
import { useNavigate } from "react-router-dom";
import '../App.css'
import { useState } from "react";
function Navbar({theme, setTheme,post}) {
  const [search,setSearch] = useState('')
  const navigate = useNavigate()
 const user = JSON.parse(localStorage.getItem('user'))
  const toogleTheme = () =>{
    setTheme(theme === "light" ? "dark" : "light")
  }
  const handleSearch = () =>{
   const foundPost = post.find((p) => p.username.toLowerCase() === search.toLowerCase());
   if(foundPost){
    const element = document.getElementById(foundPost._id);
    element?.scrollIntoView({behavior:'auto'})
   }
  }
  return (
    <nav className="navbar " style={{backgroundColor: '#f8f9fa', paddingLeft: '0.75rem', paddingRight: '0.75rem', boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,0.075)'}}>
      <h4>Social</h4>

      <div style={{display:'flex',gap:'1rem'}}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search..." />
        <button onClick={handleSearch} className="btn btn-primary">🔍</button>
        <button onClick={toogleTheme} className="btn btn-outline-dark">{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        <button onClick={() => navigate('/login')} className="btn btn-outline-primary">{!user? ("Login") : 
        user.image ?
        (<img src={user.image} alt = ""  style={{borderRadius:'50%',height:'40px',width:'40px'}}/>):
        (<div style={{borderRadius:'50%'}} >{user.name.charAt(0).toUpperCase()}</div>)
        }
        </button>
      </div>
    </nav>
  );
}

export default Navbar;