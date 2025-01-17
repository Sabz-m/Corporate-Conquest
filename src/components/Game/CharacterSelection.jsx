import "./CharacterSelection.css";
import { Link } from "react-router-dom";

export default function CharacterSelection() {
  return (
    <section className="character-selection">
      <h2>Select your character</h2>
      <Link to="/start-game">
        <button className="button">Character 1</button>
        <button className="button">Character 2</button>
        <button className="button">Character 3</button>
      </Link>
    </section>
  );
}
