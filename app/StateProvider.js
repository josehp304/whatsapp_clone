"use client";
import React, { createContext, useContext, useReducer } from "react";
export const stateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <stateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </stateContext.Provider>
);

export const useStateUser = () => useContext(stateContext);
