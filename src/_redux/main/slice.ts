import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// import types
import * as Types from './types';

// initial state of reducer
const initialState: Types.MainState = {
  openedModal: null,
  data: [],
}

// create the slice
const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Types.ModalType>) {
      const modalType = action.payload
      state.openedModal = modalType
    },
    setData(state, action: PayloadAction<any>) {
      const data = action.payload
      state.data = data
    },
  },
})

// export the actions and reducer
export const {
  openModal,
  setData,
} = slice.actions

export const MainReducer = slice.reducer