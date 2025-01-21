import "./Leaderboards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getLeaderboard } from "../../../api";
import { useEffect, useState } from "react";
import PlayerHighScoreCard from "./PlayerHighScoreCard";

export default function Leaderboards() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getLeaderboard()
      .then((leaderboard) => {
        console.log(leaderboard);
        setLeaderboard(leaderboard);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        console.error("Error fetching Leaderboard:", error);
        setIsLoading(false);
      });
  }, []);

  const backbutton = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching games leaderboard data: {error.message}</p>;
  }

  return (
    <section className="leaderboard">
      <div className="leaderboard-header">
        <button className="button-back" onClick={backbutton}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} />
          Back
        </button>
        <h2>LEADERBOARDS</h2>
      </div>
      <div className="leaderboard-buttons">
        <button className="button">
          Level <FontAwesomeIcon icon={fa1} style={{ marginRight: "10px" }} />
        </button>
        <button className="button">
          Level <FontAwesomeIcon icon={fa2} style={{ marginRight: "10px" }} />
        </button>
        <button className="button">
          Level <FontAwesomeIcon icon={fa3} style={{ marginRight: "10px" }} />
        </button>
      </div>

      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Author</th>
              <th>Achieved On</th>
              <th>Completed In</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((highScore, index) => (
              <PlayerHighScoreCard
                key={index}
                highScore={highScore}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
