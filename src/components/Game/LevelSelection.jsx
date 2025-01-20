import { Link, useNavigate } from "react-router-dom";
import "./LevelSelection.css";
import { useState, useEffect } from "react";

export default function LevelSelection() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const openLogoutModal = () => setShowLogoutModal(true);
  const closeLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <section className="level-selection">
      <h2>Select your level</h2>
      <Link to="/character-selection">
        <button className="button">level 1</button>
        <button className="button">level 2</button>
        <button className="button">level 3</button>
      </Link>
      <button className="logout" onClick={openLogoutModal}>
        Log out
      </button>
      {showLogoutModal && (
        <div className="modal">
          <p>Are you sure you want to log out?</p>
          <button onClick={handleLogout}>Log out</button>
          <button onClick={closeLogoutModal}>Cancel</button>
        </div>
      )}
    </section>
  );
}
