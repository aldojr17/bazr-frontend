import {
  IAddNewAddressRequestPayload,
  IAddNewAddressResponsePayload,
  ICitiesResponse,
  IEditAddressRequestPayload,
  IEditAddressResponsePayload,
  IProvincesResponse,
  ISetShopDefaultAddressRequestPayload,
  ISetShopDefaultAddressResponsePayload,
  ISetUserDefaultAddressRequestPayload,
  ISetUserDefaultAddressResponsePayload,
  ISubdistrictsResponse,
} from "../../interfaces/Address";
import instance from "../config/axios";
import { API_PATH } from "../path";

const getProvinces = async (): Promise<IProvincesResponse> => {
  try {
    const response = await instance.get<IProvincesResponse>(
      API_PATH.address.PROVINCES
    );
    return response.data;
  } catch (err) {
    return err as IProvincesResponse;
  }
};

const getCities = async (province_id: number): Promise<ICitiesResponse> => {
  try {
    const response = await instance.get<ICitiesResponse>(
      API_PATH.address.CITIES(province_id)
    );
    return response.data;
  } catch (err) {
    return err as ICitiesResponse;
  }
};

const getSubdistricts = async (city_id: number) => {
  try {
    const response = await instance.get<ISubdistrictsResponse>(
      API_PATH.address.SUBDISTRICTS(city_id)
    );
    return response.data;
  } catch (err) {
    return err as ISubdistrictsResponse;
  }
};

const postNewAddress = async (
  payload: IAddNewAddressRequestPayload
): Promise<IAddNewAddressResponsePayload> => {
  try {
    const response = await instance.post<IAddNewAddressResponsePayload>(
      API_PATH.address.ADDRESS,
      payload
    );
    return response.data;
  } catch (err) {
    return err as IAddNewAddressResponsePayload;
  }
};

const putEditAddress = async (
  address_id: number,
  payload: IEditAddressRequestPayload
): Promise<IEditAddressResponsePayload> => {
  try {
    const response = await instance.put<IEditAddressResponsePayload>(
      API_PATH.address.UPDATE_ADDRESS(address_id),
      payload
    );
    return response.data;
  } catch (err) {
    return err as IEditAddressResponsePayload;
  }
};

const putUserDefaultAddress = async (
  payload: ISetUserDefaultAddressRequestPayload
): Promise<ISetUserDefaultAddressResponsePayload> => {
  try {
    const response = await instance.put<ISetUserDefaultAddressResponsePayload>(
      API_PATH.address.SET_USER_DEFAULT_ADDRESS,
      payload
    );
    return response.data;
  } catch (err) {
    return err as ISetUserDefaultAddressResponsePayload;
  }
};

const putShopDefaultAddress = async (
  payload: ISetShopDefaultAddressRequestPayload
): Promise<ISetShopDefaultAddressResponsePayload> => {
  try {
    const response = await instance.put<ISetShopDefaultAddressResponsePayload>(
      API_PATH.shop.SET_SHOP_DEFAULT_ADDRESS,
      payload
    );
    return response.data;
  } catch (err) {
    return err as ISetShopDefaultAddressResponsePayload;
  }
};

const addressService = {
  getProvinces,
  getCities,
  getSubdistricts,
  postNewAddress,
  putEditAddress,
  putUserDefaultAddress,
  putShopDefaultAddress,
};

export default addressService;
