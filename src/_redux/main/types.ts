// ---------------- main redux ----------------
export type MainState = {
  openedModal: ModalType,
  data: any,
}

export type ModalType = 'A' | 'B' | null