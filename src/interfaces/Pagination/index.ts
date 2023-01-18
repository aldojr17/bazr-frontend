import { Dispatch } from "react";

export interface IPaginationProps {
  data: {
    total_page: number;
    current_page: number;
  };
  setPage: Dispatch<React.SetStateAction<number>> | ((payload: number) => void);
}
