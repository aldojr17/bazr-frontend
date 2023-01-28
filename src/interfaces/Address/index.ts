import { IUserAddress } from "../User";

export interface IAddressPayload {
  id: number;
  city_id: number;
  city_name: string;
  sub_district: string;
  province_name: string;
  district_ward: string;
  zip_code: string;
  street_name: string;
  notes: string;
  recipient_name: string;
  recipient_phone: string;
}

export interface IPropsAddressModalBody {
  onClose: () => void;
  setRefetchUserAddress: React.Dispatch<React.SetStateAction<number>>;
}

export enum EModalTitle {
  ADD_NEW_ADDRESS = "Add New Address",
  EDIT_ADDRESS = "Edit Address",
}

export interface IModalTitle {
  title: EModalTitle;
  addressId: number;
}

export interface IAddressState {
  modalTitle: IModalTitle;
  provinces: IProvince[];
  cities: ICity[];
  subdistricts: ISubdistrict[];
  selectedZipCode: string;
  inputName: string;
  inputPhoneNumber: string;
  inputDistrictWard: string;
  inputStreetName: string;
  inputNotes: string;
  selectedProvinceId: number;
  selectedCityId: number;
  selectedSubdistrictId: number;
}

export interface IPropsAddressItem {
  address: IUserAddress;
  onOpen: () => void;
  refetchUserAddress: () => void;
}

export interface IPropsAddressModal {
  isOpen: boolean;
  onClose: () => void;
  setRefetchUserAddress: React.Dispatch<React.SetStateAction<number>>;
}

export interface IAddNewAddressRequestPayload {
  province_id: number;
  city_id: number;
  sub_district: string;
  district_ward: string;
  zip_code: string;
  notes: string;
  street_name: string;
  recipient_name: string;
  recipient_phone: string;
}

export interface IEditAddressRequestPayload
  extends IAddNewAddressRequestPayload {}

export interface IAddNewAddressResponsePayload {
  data: string;
  is_success: boolean;
  message: string;
}

export interface IProvincesResponse {
  data: IProvince[];
  is_success: boolean;
  message: string;
}

export interface IProvince {
  province: string;
  province_id: number;
}

export interface ICitiesResponse {
  data: ICity[];
  is_success: boolean;
  message: string;
}

export interface ICity {
  city: string;
  city_id: number;
  type: string;
  zip_code: string;
}

export interface ISubdistrictsResponse {
  data: ISubdistrict[];
  is_success: boolean;
  message: string;
}

export interface ISubdistrict {
  subdistrict: string;
  subdistrict_id: number;
  zip_code: string;
}

export interface IFormAddNewAddress {
  name: string;
  phoneNumber: string;
  province: number;
  city: number;
  subdistrict: number;
  zipcode: string;
  districtward: string;
  streetname: string;
  notes: string;
}

export interface IFormEditAddress extends IFormAddNewAddress {}
export interface IEditAddressResponsePayload {
  data: string;
  is_success: true;
  message: string;
}

export interface ISetUserDefaultAddressRequestPayload {
  address_id: number;
}

export interface ISetShopDefaultAddressRequestPayload {
  address_id: number;
}

export interface ISetUserDefaultAddressResponsePayload {
  data: string;
  is_success: true;
  message: string;
}

export interface ISetShopDefaultAddressResponsePayload {
  data: string;
  is_success: true;
  message: string;
}
