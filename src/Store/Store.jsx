/*Role: Configures and creates the Redux store.
Purpose: Sets up the Redux store by combining the reducers and applying middleware like Redux Thunk (if needed).
Example: This file creates the Redux store and exports it, providing access to the entire application’s state.*/

import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../Reducers/Index"; // combine all reducers

//create the store

const store = configureStore({ reducer: gameReducer });

export default store;
