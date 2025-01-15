/*Role: Configures and creates the Redux store.
Purpose: Sets up the Redux store by combining the reducers and applying middleware like Redux Thunk (if needed).
Example: This file creates the Redux store and exports it, providing access to the entire application’s state.*/


import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../Reducers/Index'; // combine all reducers
import {Provider} from 'react-redux'


//create the store



const store = configureStore({ 
    
    reducer: rootReducer

});

export default store;
