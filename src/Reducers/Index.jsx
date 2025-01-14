/*Role: Combines all reducers into a single root reducer.
Purpose: This file combines the individual reducers (gameReducer, playerReducer, etc.) into one root reducer using combineReducers().
Example: It combines all the reducers and exports the root reducer for use in the Redux store.*/
exports.CombatReducer = require("./CombatReducer");
exports.GameReducer = require("./GameReducer");
exports.InventoryReducer = require("./InventoryReducer");
exports.PlayerReducer = require("./PlayerReducer");
