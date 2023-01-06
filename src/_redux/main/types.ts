// ---------------- main redux ----------------
export type MainState = {
  openedModal: ModalType,
  themeColor: string,
  data: any,
  totalCount: number,
  totalData: any,
  totalIds: any,
  detailData: any,
  openedDetailModal: boolean,
  evenFlag: boolean
}

export type ModalType = 'A' | 'B' | null