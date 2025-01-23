import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ComingSoonPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="menu">
      <h2>Coming sooooooonnnn......</h2>

      <Link to="/" className="back-button" onClick={goBack}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ marginRight: "10px", fontSize: "20px" }}
        />
        Go Back
      </Link>
    </section>
  );
}
