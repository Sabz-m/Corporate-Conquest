import { Routes, Route } from "react-router-dom";
import Menu from "./Menu/Menu";
import StartGame from "./Game/GameLoop";
import Login from "./LogIn-SignUp/Login";
import Settings from "./Settings";
import Leaderboards from "./Leaderboards";
import SignUp from "./LogIn-SignUp/SignUp";
import CharacterSelection from "./Game/CharacterSelection";
import LevelSelection from "./Game/LevelSelection";

const App = () => {
  return (
    <section>
      <p>in app</p>
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route path="/start-game" element={<StartGame />}></Route>
        <Route path="/level-selection" element={<LevelSelection />}></Route>
        <Route
          path="/character-selection"
          element={<CharacterSelection />}
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/leaderboard" element={<Leaderboards />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </section>
  );
};

export default App;
