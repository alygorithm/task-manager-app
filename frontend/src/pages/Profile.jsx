export default function Profile() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="page">

      <h1>Profile</h1>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}