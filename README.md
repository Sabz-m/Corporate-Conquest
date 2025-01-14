# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


src/components/
App.js

    Role: The main entry point of the application.
    Purpose: Renders the overall structure of the app, including the game or login/signup screen based on the user’s authentication state.
    Example: It could conditionally render the login/signup components or the game loop depending on whether the user is logged in.

Game/

This folder contains components related to the core game logic.

    GameLoop.js
        Role: The main container for the game loop.
        Purpose: This is the component where the overall game logic is managed. It might start and stop the game, manage the game’s state, and render other components like the HUD or the Phaser game itself.
        Example: It could render the Phaser game, handle game pause/resume, and monitor the game state.
        Note: Yes, GameLoop.js is responsible for rendering the game itself, but it might delegate specific tasks to other components (e.g., PhaserGame.js for initializing the Phaser game).

    PhaserGame.js
        Role: Manages the Phaser game instance.
        Purpose: Initializes and runs the Phaser game engine. It configures the game, handles updates, renders the game scene, and connects it with the game loop (via Phaser’s update method).
        Example: This file initializes the Phaser game and sets up the main game scene (e.g., loading assets, configuring player controls, handling collisions).

    Player.js
        Role: Handles the player’s behavior and state.
        Purpose: Contains logic for player movement, health, position, and other player-related functionality. It interacts with the Redux store to manage the player's state globally.
        Example: This file handles player input, updates player position, and tracks player health.

    Map.js
        Role: Manages the map or world environment.
        Purpose: Handles loading and rendering the map, possibly using tools like Tiled (for tiled maps), and it stores relevant map data. It also might manage the tile-based grid or world setup.
        Example: This component might load and display a tilemap or procedural world, using the Phaser engine.

    Pathfinding.js
        Role: Responsible for calculating paths for entities.
        Purpose: Implements an A* algorithm or other pathfinding logic to find a route between two points, such as the player’s current location and a target destination. It may update the player’s position or AI-controlled enemies.
        Example: This file could be used to calculate and update movement paths for the player or NPCs in the game.

    FOV.js
        Role: Handles the Field of View (FOV) calculations.
        Purpose: Calculates which parts of the map are visible based on the player’s position and line of sight. This is useful for games with fog-of-war mechanics.
        Example: This component updates the game scene to show the player’s visible area and hide areas outside their line of sight.

HUD/

This folder contains components for the game's user interface.

    HealthBar.js
        Role: Displays the player’s health in the game’s HUD.
        Purpose: This component fetches the player’s health from the Redux store and renders it as a visual bar, typically showing health percentage or current health points.
        Example: A simple health bar that updates when the player's health changes.

    Inventory.js
        Role: Displays the player’s inventory.
        Purpose: This component shows a list of items the player has collected during the game. It allows interaction, such as equipping items or using consumables.
        Example: Display a grid or list of items, along with their icons and stats, and allow the player to interact with them.

    Stats.js
        Role: Displays the player’s stats (like experience, level, etc.).
        Purpose: This component shows relevant player statistics, such as level, experience points, or other attributes. It keeps the player informed about their progress.
        Example: Display the player's level and experience progress bar.

Combat/

This folder handles combat logic and mechanics.

    CombatLogic.js
        Role: Manages the combat system.
        Purpose: Contains the rules and logic for combat interactions, such as attacking, receiving damage, and applying effects to characters or enemies.
        Example: This might involve calculating damage based on stats, triggering combat animations, and updating the player's health after a combat action.

LoginSignup/

These components handle user authentication.

    Login.js
        Role: Provides the login interface.
        Purpose: A form that allows users to log into the game. This could include form fields for username/email and password, and logic to authenticate the user.
        Example: A login form with input fields and a submit button that authenticates the user and sets up their session.

    Signup.js
        Role: Provides the signup interface.
        Purpose: A form that allows users to create an account, usually by entering a username, email, and password.
        Example: A signup form that sends the user’s credentials to the backend for account creation.

src/actions/

This folder contains action creators for Redux.

    gameActions.js
        Role: Contains actions related to the game’s global state.
        Purpose: Actions for controlling the game’s timer, paused state, and other global game features.
        Example: Actions like startTimer, stopTimer, togglePause, and resetGame.

    playerActions.js
        Role: Contains actions related to the player's state.
        Purpose: Actions for updating the player's position, health, inventory, and other attributes.
        Example: Actions like updatePlayerPosition, updatePlayerHealth, and setPlayerStats.

    inventoryActions.js
        Role: Contains actions related to managing the player's inventory.
        Purpose: Actions for adding or removing items from the player’s inventory.
        Example: Actions like addItem, removeItem, and useItem.

    combatActions.js
        Role: Contains actions related to combat state.
        Purpose: Actions for handling combat-related changes, such as dealing damage, starting a fight, or resolving an attack.
        Example: Actions like startCombat, endCombat, and applyDamage.

src/reducers/

This folder contains Redux reducers that manage different pieces of state.

    gameReducer.js
        Role: Handles game-related state.
        Purpose: Manages the global game state, including the timer, pause state, and any other global settings like level progression or game over conditions.
        Example: A reducer that handles the START_TIMER, STOP_TIMER, and TOGGLE_PAUSE actions.

    playerReducer.js
        Role: Handles the player’s state.
        Purpose: Manages player-related data, such as position, health, stats, and any other player-specific state.
        Example: A reducer that updates the player’s health and position based on dispatched actions.

    inventoryReducer.js
        Role: Handles the player’s inventory state.
        Purpose: Manages the inventory data, including the items the player has collected or used.
        Example: A reducer that adds or removes items from the player’s inventory.

    combatReducer.js
        Role: Handles the combat state.
        Purpose: Manages the combat-related data, including health, damage taken, and combat status.
        Example: A reducer that tracks whether the player is currently in combat and applies any combat actions like dealing damage.

    index.js
        Role: Combines all reducers into a single root reducer.
        Purpose: This file combines the individual reducers (gameReducer, playerReducer, etc.) into one root reducer using combineReducers().
        Example: It combines all the reducers and exports the root reducer for use in the Redux store.

src/store/

    store.js
        Role: Configures and creates the Redux store.
        Purpose: Sets up the Redux store by combining the reducers and applying middleware like Redux Thunk (if needed).
        Example: This file creates the Redux store and exports it, providing access to the entire application’s state.

Summary of Key Components:

    GameLoop.js: Manages the core game loop, handling the game’s state (pause, start, stop, etc.) and rendering.
    PhaserGame.js: Initializes and handles the Phaser game instance.
    Player.js: Manages player-specific data (position, health, stats).
    Map.js: Handles map rendering and related data.
    Pathfinding.js & FOV.js: Handle pathfinding and field-of-view calculations.
    HUD Components: Display the user interface elements like health, inventory, and stats.
    CombatLogic.js: Manages combat logic and player combat interactions.
    LoginSignup Components: Handle user authentication (login, signup).
