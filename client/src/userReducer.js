/*useReducer is usually preferable to useState when you have complex state logic 
that involves multiple sub-values or when the next state depends on the previous one.*/

const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default UserReducer;