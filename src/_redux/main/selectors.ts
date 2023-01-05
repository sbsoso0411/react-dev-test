import { createSelector } from 'reselect';

import { AppState } from '../_root';

// opened modal type selector
const openedModal = (state: AppState) => state.main.openedModal
export const openedModalSelector = createSelector(openedModal, (modalType) => modalType)

// data selector
const data = (state: AppState) => state.main.data
export const dataSelector = createSelector(data, (contacts) => contacts)