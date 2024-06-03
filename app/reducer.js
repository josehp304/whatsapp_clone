"use client";
export let initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
}
export default reducer;
