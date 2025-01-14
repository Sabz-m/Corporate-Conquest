/*Role: Combines all reducers into a single root reducer.
Purpose: This file combines the individual reducers (gameReducer, playerReducer, etc.) into one root reducer using combineReducers().
Example: It combines all the reducers and exports the root reducer for use in the Redux store.*/

import { combineReducers } from "redux";
import GameReducer from './GameReducer'
import PlayerReducer from "./PlayerReducer";
import InventoryReducer from './InventoryReducer'
import CombatReducer from './CombatReducer'


const rootReducer = combineReducers({
    game: GameReducer,
    player: PlayerReducer,
    inventory: InventoryReducer,
    combat: CombatReducer,
});

export default rootReducer;