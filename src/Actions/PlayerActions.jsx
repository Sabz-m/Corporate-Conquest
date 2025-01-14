/*Role: Contains actions related to the player's state.
Purpose: Actions for updating the player's position, health, inventory, and other attributes.
Example: Actions like updatePlayerPosition, updatePlayerHealth, and setPlayerStats.*/


export const updatePlayerScore = (score) => {
    return {
        type: 'UPDATE_PLAYER_SCORE', //needs to match action type in the reducer
        payload: score, //new score value to update
    }
}