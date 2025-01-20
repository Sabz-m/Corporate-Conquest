import { ADD_ITEM, REMOVE_ITEM, USE_ITEM } from "../Actions/InventoryActions";

const initialState = {
  inventory: [],
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };
    case REMOVE_ITEM:
      return {
        ...state,
        inventory: state.inventory.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case USE_ITEM:
      return {
        ...state,
        inventory: state.inventory.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default inventoryReducer;
