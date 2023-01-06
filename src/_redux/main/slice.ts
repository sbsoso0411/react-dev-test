import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// import types
import * as Types from './types';

// initial state of reducer
const initialState: Types.MainState = {
  openedModal: null,
  themeColor: '#ffffff',
  data: [],
  totalCount: 0,
  totalData: [],
  totalIds: [],
  detailData: {},
  openedDetailModal: false,
  evenFlag: false
}

// create the slice
const slice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Types.ModalType>) {
      const modalType = action.payload
      if (modalType == 'A') {
        state.themeColor = '#46139f'
      }
      else if (modalType == 'B'){
        state.themeColor = '#ff7f50'
      }
      else{
        state.themeColor = '#ffffff'
      }
      state.evenFlag = false
      state.openedModal = modalType
    },
    setData(state, action: PayloadAction<any>) {
      const data = action.payload
      state.data = data
    },
    setDetailData(state, action: PayloadAction<any>) {
      const data = action.payload
      state.detailData = data
      state.openedDetailModal = true
    },
    closeDetailModal(state, action: PayloadAction<any>) {
      state.openedDetailModal = action.payload
    },
    setEvenFlag(state, action: PayloadAction<any>) {
      state.evenFlag = action.payload
    },
    setTotalCount(state, action: PayloadAction<any>) {
      state.totalCount = action.payload
    },
    setTotalData(state, action: PayloadAction<any>) {
      state.totalData = action.payload
    },
    setTotalIds(state, action: PayloadAction<any>) {
      state.totalIds = action.payload
    },
  },
})

// export the actions and reducer
export const {
  openModal,
  setData,
  setDetailData,
  closeDetailModal,
  setEvenFlag,
  setTotalData,
  setTotalCount,
  setTotalIds,
} = slice.actions

export const MainReducer = slice.reducer