import { Link } from "react-router-dom";

export default function LevelSelection() {
  return (
    <section>
      <p>Select your level here</p>
      <Link to="/character-selection">
        <button>level 1</button>
        <button>level 2</button>
        <button>level 3</button>
      </Link>
    </section>
  );
}
