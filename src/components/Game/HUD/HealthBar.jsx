/*Role: Displays the player’s health in the game’s HUD.
Purpose: This component fetches the player’s health from the Redux store and renders it as a visual bar, typically showing health percentage or current health points.
Example: A simple health bar that updates when the player's health changes.*/

import React from "react";
import { useSelector } from "react-redux";

const HealthBar = () => {
    const {health} = useSelector((state) => state.player); //access health from redux store

    return (
        <div>
            <p>Health: {health}/100</p> {/*Display health in HUD*/}
        </div>
    );
};

export default HealthBar;