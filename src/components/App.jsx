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


/*Role: The main entry point of the application.
Purpose: Renders the overall structure of the app, including the game or login/signup screen based on the user’s authentication state.
Example: It could conditionally render the login/signup components or the game loop depending on whether the user is logged in. */