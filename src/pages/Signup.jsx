function Signup() {
  return (
    <div className="container mt-5">
      <h3>Signup</h3>
      <input className="form-control mb-2" placeholder="Name" />
      <input className="form-control mb-2" placeholder="Email" />
      <input className="form-control mb-2" placeholder="Password" type="password"/>
      <button className="btn btn-success">Signup</button>
    </div>
  );
}

export default Signup;