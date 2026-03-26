
import { useNavigate } from "react-router-dom";
import '../App.css'
function Navbar({theme, setTheme}) {
  const navigate = useNavigate()
  const toogleTheme = () =>{
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <nav className="navbar bg-light px-3 shadow-sm">
      <h4>Social</h4>

      <div className="d-flex gap-3">
        <input className="form-control" placeholder="Search..." />
        <button className="btn btn-primary">🔍</button>
        <button onClick={toogleTheme} className="btn btn-outline-dark">{theme === "light" ? "🌙 Dark" : "☀️ Light"}</button>
        <button onClick={() => navigate('/login')} className="btn btn-outline-primary">Login</button>
      </div>
    </nav>
  );
}

export default Navbar;