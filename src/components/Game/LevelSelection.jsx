import { Link } from "react-router-dom";
import "./LevelSelection.css";

export default function LevelSelection() {
  return (
    <section className="level-selection">
      <h2>Select your level</h2>
      <Link to="/character-selection">
        <button className="button">level 1</button>
        <button className="button">level 2</button>
        <button className="button">level 3</button>
      </Link>
    </section>
  );
}
