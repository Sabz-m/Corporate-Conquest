import { Routes, Route } from "react-router-dom";
import Menu from "./Menu/Menu";
import StartGame from "./Game/GameLoop";
import Login from "./LogIn-SignUp/Login";
import Settings from "./Settings";
import Leaderboards from "./Leaderboards";
import SignUp from "./LogIn-SignUp/SignUp";

const App = () => {
  return (
    <section>
      <p>in app</p>
      <Routes>
        <Route path="/" element={<Menu />}></Route>
      </Routes>
      <Routes>
        <Route path="/start-game" element={<StartGame />}></Route>
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Routes>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboards />}></Route>
      </Routes>
      <Routes>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Routes>
    </section>
  );
};

export default App;
