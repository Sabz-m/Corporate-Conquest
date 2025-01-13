import React from 'react';
import GameLoop from './Game/GameLoop';
import Login from './LogIn-SignUp/Login';

const App = () => {
  const isLoggedIn = false; // Assume login state is managed via Redux

  return (
    <div>
      {isLoggedIn ? <GameLoop /> : <Login />}
    </div>
  );
};

export default App;
