import { IWalletHistory } from "../../Wallet";

export interface IWalletHistoryBtnProps {
  data: IWalletHistory;
}

export interface IWalletTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IWalletHistory;
}
