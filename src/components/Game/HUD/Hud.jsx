import React from 'react';
import Timer from './Timer';
import Score from './Score';


const HUD = () => {
  return (
    <div>
      <Timer /> {/* Display the timer */}
      {/*<HealthBar />*/}
      {/*<Inventory />*/}
      <Score/>{/*<Stats />*/}
    </div>
  );
};

export default HUD;