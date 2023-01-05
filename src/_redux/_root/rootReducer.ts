import { combineReducers } from '@reduxjs/toolkit';

import { GlobalReducer } from '../global';
import { MainReducer } from '../main';

// Seperate Reducers
const global = { global: GlobalReducer }
const main = { main: MainReducer }

// Combile all of the Reducers and Create the Root Reducer
let rootReducer = combineReducers({
  ...global,
  ...main,
})
export default function createReducer(injectedReducers = {}) {
  rootReducer = combineReducers({
    ...global,
    ...main,
    ...injectedReducers,
  })
  return rootReducer
}

// Root State
export type AppState = ReturnType<typeof rootReducer>