import { SetStateAction } from "react";

export type PostCellData = {
  name: string;
  icon: string;
  iconCode: string;
  currentValue: number;
}

export interface CellData {
  id: number;
  name: string;
  icon: string;
  iconCode: string;
  currentValue: number;
  lastUpdated: Date;
}

export type CellModalProps = {
    setShowModal: React.Dispatch<SetStateAction<boolean>>
    setCells: React.Dispatch<SetStateAction<CellData[]>>
}

export type opStatus = {
    message: string | null
    status: 'ok' | 'nok'
}