import { useAppDispatch, useAppSelector } from "./useSelector";
import {
  setModalTitle as _setModalTitle,
  setProvinces,
  setCities,
  setSubdistricts,
  setSelectedZipCode as _setSelectedZipCode,
  setinputName as _setinputName,
  setInputPhoneNumber as _setInputPhoneNumber,
  setinputDistrictWard as _setinputDistrictWard,
  setInputStreetName as _setInputStreetName,
  setInputNotes as _setInputNotes,
  setSelectedProvinceId as _setSelectedProvinceId,
  setSelectedCityId as _setSelectedCityId,
  setSelectedSubdistrictId as _setSelectedSubdistrictId,
} from "../redux/address";
import useToast from "./useToast";
import addressService from "../api/service/address";
import {
  IAddNewAddressRequestPayload,
  IEditAddressRequestPayload,
  IModalTitle,
  ISetShopDefaultAddressRequestPayload,
  ISetUserDefaultAddressRequestPayload,
} from "../interfaces/Address";

const useAddress = () => {
  const {
    modalTitle,
    provinces,
    cities,
    subdistricts,
    selectedZipCode,
    inputName,
    inputPhoneNumber,
    inputDistrictWard,
    inputStreetName,
    inputNotes,
    selectedProvinceId,
    selectedCityId,
    selectedSubdistrictId,
  } = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();
  const { successToast, errorToast } = useToast();

  const setModalTitle = (payload: IModalTitle) => {
    dispatch(_setModalTitle(payload));
  };

  const fetchProvinces = async () => {
    const response = await addressService.getProvinces();
    if (response.is_success) {
      dispatch(setProvinces(response.data));
      return response.data;
    }
    return null;
  };

  const fetchCities = async (province_id: number) => {
    const response = await addressService.getCities(province_id);
    if (response.is_success) {
      dispatch(setCities(response.data));
      return response.data;
    }
    return null;
  };

  const fetchSubdistricts = async (city_id: number) => {
    const response = await addressService.getSubdistricts(city_id);
    if (response.is_success) {
      dispatch(setSubdistricts(response.data));
      return response.data;
    }
    return null;
  };

  const addNewAddress = async (payload: IAddNewAddressRequestPayload) => {
    const response = await addressService.postNewAddress(payload);
    if (response.is_success) {
      successToast("Add new address success");
      return "Add new address success";
    }
    errorToast(response.message);
    return response.message;
  };

  const setSelectedZipCode = (payload: string) => {
    dispatch(_setSelectedZipCode(payload));
  };

  const setinputName = (payload: string) => {
    dispatch(_setinputName(payload));
  };

  const cleanInputPhoneNumber = (num: string): string => {
    const indexOfEight = num.indexOf("8");
    if (indexOfEight === -1) {
      return "";
    }
    return num.slice(indexOfEight);
  };

  const setInputPhoneNumber = (payload: string) => {
    dispatch(_setInputPhoneNumber(payload));
  };

  const setinputDistrictWard = (payload: string) => {
    dispatch(_setinputDistrictWard(payload));
  };

  const setInputStreetName = (payload: string) => {
    dispatch(_setInputStreetName(payload));
  };

  const setInputNotes = (payload: string) => {
    dispatch(_setInputNotes(payload));
  };

  const setSelectedProvinceId = (payload: number) => {
    dispatch(_setSelectedProvinceId(payload));
  };

  const setSelectedCityId = (payload: number) => {
    dispatch(_setSelectedCityId(payload));
  };

  const setSelectedSubdistrictId = (payload: number) => {
    dispatch(_setSelectedSubdistrictId(payload));
  };

  const resetFormState = () => {
    dispatch(_setinputName(""));
    dispatch(_setInputPhoneNumber(""));
    dispatch(_setSelectedProvinceId(-1));
    dispatch(_setSelectedCityId(-1));
    dispatch(_setSelectedSubdistrictId(-1));
    dispatch(_setSelectedZipCode(""));
    dispatch(_setinputDistrictWard(""));
    dispatch(_setInputStreetName(""));
    dispatch(_setInputNotes(""));
  };

  const updateAddress = async (
    address_id: number,
    payload: IEditAddressRequestPayload
  ) => {
    const response = await addressService.putEditAddress(address_id, payload);
    if (response.is_success) {
      successToast("Edit address success");
      return response.data;
    }
    errorToast(response.message);
    return null;
  };

  const updateUserDefaultAddress = async (
    payload: ISetUserDefaultAddressRequestPayload
  ) => {
    const response = await addressService.putUserDefaultAddress(payload);
    if (response.is_success) {
      successToast("Set as Default Shipping Success");
      return response.data;
    }
    errorToast(response.message);
    return null;
  };

  const updateShopDefaultAddress = async (
    payload: ISetShopDefaultAddressRequestPayload
  ) => {
    const response = await addressService.putShopDefaultAddress(payload);
    if (response.is_success) {
      successToast("Set as Shop Location Success");
      return response.data;
    }
    errorToast(response.message);
    return null;
  };

  return {
    modalTitle,
    setModalTitle,

    provinces,
    fetchProvinces,

    cities,
    fetchCities,

    subdistricts,
    fetchSubdistricts,

    selectedZipCode,
    setSelectedZipCode,

    inputName,
    setinputName,

    inputPhoneNumber,
    cleanInputPhoneNumber,
    setInputPhoneNumber,

    inputDistrictWard,
    setinputDistrictWard,

    inputStreetName,
    setInputStreetName,

    inputNotes,
    setInputNotes,

    selectedProvinceId,
    setSelectedProvinceId,

    selectedCityId,
    setSelectedCityId,

    selectedSubdistrictId,
    setSelectedSubdistrictId,

    addNewAddress,
    resetFormState,
    updateAddress,
    updateUserDefaultAddress,
    updateShopDefaultAddress,
  };
};

export default useAddress;
