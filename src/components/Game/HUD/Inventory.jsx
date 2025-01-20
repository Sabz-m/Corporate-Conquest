import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  useItem,
} from "../../../Actions/InventoryActions";

const Inventory = () => {
  const inventory = useSelector((state) => state.inventory.inventory || []);

  const dispatch = useDispatch();

  const handleAddItem = () => {
    const newItem = { id: 1, name: "Health Potion", effect: "heal" };
    dispatch(addItem(newItem));
  };

  const handleRemoveItem = (itemId) => {
    const itemToRemove = { id: itemId, name: "Health Potion", effect: "heal" };
    dispatch(removeItem(itemToRemove));
  };

  const handleUseItem = (itemId) => {
    const itemToUse = { id: itemId, name: "Health Potion", effect: "heal" };
    dispatch(useItem(itemToUse));
  };

  // Ensure inventory is an array before using .map
  if (!Array.isArray(inventory)) {
    console.error("Inventory is not an array:", inventory);
    return <div>Error: Inventory data is not in the expected format.</div>;
  }

  return (
    <div>
      <button onClick={handleAddItem}>Add Health Potion</button>
      <button onClick={() => handleRemoveItem(1)}>Remove Health Potion</button>
      <button onClick={() => handleUseItem(1)}>Use Health Potion</button>

      {/* Render the inventory items */}
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name} - {item.effect}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
