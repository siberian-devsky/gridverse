export interface CellData {
  id: number;
  name: string;
  icon: string;
  iconCode: string;
  currentValue: number;
  lastUpdated: Date;
}

export type PostCellData = {
  name: string;
  icon: string;
  iconCode: string;
  currentValue: number;
}