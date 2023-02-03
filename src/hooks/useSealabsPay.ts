import sealabsPayService from "../api/service/sealabspay";
import {
  ISealabsPayDataResponsePayload,
  ISealabsPayDeletePayload,
  ISealabsPayUpdateDefaultPayload,
} from "../interfaces/SealabsPay";
import {
  storeSealabsPay,
  clearSealabsPay,
  storeChosenSealabsPay,
  deleteSealabsPay,
} from "../redux/sealabsPay";
import { useAppDispatch, useAppSelector } from "./useSelector";

const useSealabsPay = () => {
  const { sealabsPay, chosenSealabsPay } = useAppSelector(
    (state) => state.sealabsPay
  );

  const dispatch = useAppDispatch();

  const getSealabsPay = async () => {
    const response = await sealabsPayService.getAllSealabsPay();

    if (response.is_success) {
      dispatch(storeSealabsPay(response.data));
      return response.data;
    }
  };

  const clearSealabsPayState = () => {
    dispatch(clearSealabsPay());
  };

  const deleteASealabsPay = async (payload: ISealabsPayDeletePayload) => {
    const response = await sealabsPayService.deleteSealabsPay(payload);

    if (response.is_success) {
      dispatch(deleteSealabsPay(payload.sealabs_pay_id));
      return response;
    }
  };

  const setChosenSealabsPay = (payload: ISealabsPayDataResponsePayload) => {
    dispatch(storeChosenSealabsPay(payload));
  };

  const updateDefaultSealabsPay = async (
    payload: ISealabsPayUpdateDefaultPayload
  ) => {
    const response = await sealabsPayService.updateUserDefaultSealabsPay(
      payload
    );

    return response;
  };

  return {
    sealabsPay,
    chosenSealabsPay,
    getSealabsPay,
    clearSealabsPayState,
    setChosenSealabsPay,
    updateDefaultSealabsPay,
    deleteASealabsPay,
  };
};

export default useSealabsPay;
