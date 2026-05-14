import BottomNav from "./BottomNav";
import "../styles/profile.css";

export default function Profile() {

  const email = localStorage.getItem("email");
  const username = email ? email.split("@")[0] : "Utente";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <h2>Profilo</h2>
      </div>

      <div className="profile-scroll">

        {/* CARD PROFILO */}
        <div className="profile-card">
          <div className="avatar">
            <span>{username.charAt(0).toUpperCase()}</span>
          </div>

          <h3 className="profile-name">{username}</h3>
          <p className="profile-email">{email}</p>
        </div>

        {/* SEZIONE ACCOUNT */}
        <div className="settings-section">
          <div className="settings-title">Account</div>

          <div className="settings-item">
            <span>Modifica profilo</span>
            <span className="arrow">›</span>
          </div>

          <div className="settings-item">
            <span>Cambia password</span>
            <span className="arrow">›</span>
          </div>
        </div>

        {/* SEZIONE APP */}
        <div className="settings-section">
          <div className="settings-title">App</div>

          <div className="settings-item">
            <span>Notifiche</span>
            <span className="arrow">›</span>
          </div>

          <div className="settings-item">
            <span>Tema</span>
            <span className="arrow">›</span>
          </div>

          <div className="settings-item">
            <span>Info</span>
            <span className="arrow">›</span>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="settings-section">
          <div className="settings-item logout" onClick={logout}>
            <span>Esci</span>
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
