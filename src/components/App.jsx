import { Provider } from "react-redux";
import store from "../Store/Store";
import GameLoop from "./Game/GameLoop";
import { Routes, Route } from "react-router-dom";
import Menu from "./Menu/Menu";
import Login from "./LogInSignup/Login";
import Settings from "./Settings/Settings";
import Leaderboards from "./Leaderboards/Leaderboards";
import SignUp from "./LogInSignup/SignUp";
import CharacterSelection from "./Game/CharacterSelection";
import LevelSelection from "./Game/LevelSelection";
import LoginSignup from "./LogInSignup/LoginSignup";
import InGameSettings from "./Settings/inGameSettings";
import ComingSoonPage from "./Menu/ComingSoon";

const App = () => {
  return (
    <Provider store={store}>
      <section>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/start-game" element={<GameLoop />}></Route>
          <Route path="/level-selection" element={<LevelSelection />}></Route>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route path="/register" element={<LoginSignup />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route
            path="/character-selection"
            element={<CharacterSelection />}
          ></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/inGameSettings" element={<InGameSettings />}></Route>
          <Route path="/leaderboard" element={<Leaderboards />}></Route>
          <Route path="/coming-soon" element={<ComingSoonPage />}></Route>
        </Routes>
      </section>
    </Provider>
  );
};

export default App;

/*Role: The main entry point of the application.
Purpose: Renders the overall structure of the app, including the game or login/signup screen based on the user’s authentication state.
Example: It could conditionally render the login/signup components or the game loop depending on whether the user is logged in. */
