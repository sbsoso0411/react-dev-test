import { createSelector } from 'reselect';

import { AppState } from '../_root';

// opened modal type selector
const openedModal = (state: AppState) => state.main.openedModal
export const openedModalSelector = createSelector(openedModal, (modalType) => modalType)

// data selector
const data = (state: AppState) => state.main.data
export const dataSelector = createSelector(data, (contacts) => contacts)

// themeColor selector
const themeColor = (state: AppState) => state.main.themeColor
export const themeColorSelector = createSelector(themeColor, (themeColor) => themeColor)

// detailData selector
const detailData = (state: AppState) => state.main.detailData
export const detailDataSelector = createSelector(detailData, (detailData) => detailData)

// openedDetailModal selector
const openedDetailModal = (state: AppState) => state.main.openedDetailModal
export const openedDetailModalSelector = createSelector(openedDetailModal, (openedDetailModal) => openedDetailModal)

// evenFlag selector
const evenFlag = (state: AppState) => state.main.evenFlag
export const evenFlagSelector = createSelector(evenFlag, (evenFlag) => evenFlag)