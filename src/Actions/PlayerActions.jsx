

export const updatePlayerScore = (score) => {
    
    return {
        type: 'UPDATE_PLAYER_SCORE', //needs to match action type in the reducer
        payload: score, //new score value to update
    }
}

export const updatePlayerHealth = (healthChange) => {
    return {
        type: 'UPDATE_PLAYER_HEALTH',
        payload: healthChange,
    }
}

export const setHasCollided = (value) => {
    return {
        type: 'SET_HAS_COLLIDED',
        payload: value
    }
}
