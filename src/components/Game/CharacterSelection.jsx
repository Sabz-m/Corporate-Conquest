import { Link } from "react-router-dom";

export default function CharacterSelection() {
  return (
    <section>
      <p>Select your character here</p>
      <Link to="/start-game">
        <button>Character 1</button>
        <button>Character 2</button>
        <button>Character 3</button>
      </Link>
    </section>
  );
}
