/*Role: Handles the combat state.
Purpose: Manages the combat-related data, including health, damage taken, and combat status.
Example: A reducer that tracks whether the player is currently in combat and applies any combat actions like dealing damage.*/



const initialState = {
    enemyHealth: 100,
    playerIsAttacking: false,
};

const CombatReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ENEMY_TAKES_DAMAGE':
            return {
                ...state,
                enemyHealth: state.enemyHealth - action.payload,
            };

            case 'TOGGLE_PLAYER_ATTACK':
                return {
                    ...state,
                    playerIsAttacking: action.payload,
                };

            default: 
                return state;
    }
}

export default CombatReducer;


