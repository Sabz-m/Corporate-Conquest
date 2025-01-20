/*Role: Contains actions related to managing the player's inventory.
Purpose: Actions for adding or removing items from the player’s inventory.
Example: Actions like addItem, removeItem, and useItem.*/

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const USE_ITEM = "USE_ITEM";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE_ITEM,
    payload: item,
  };
};

export const useItem = (item) => {
  return {
    type: USE_ITEM,
    payload: item,
  };
};
