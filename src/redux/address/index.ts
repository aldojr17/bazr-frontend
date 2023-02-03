import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EModalTitle,
  IAddressState,
  ICity,
  IModalTitle,
  IProvince,
  ISubdistrict,
} from "../../interfaces/Address";

const initialState: IAddressState = {
  modalTitle: { title: EModalTitle.ADD_NEW_ADDRESS, addressId: -1 },
  provinces: [],
  cities: [],
  subdistricts: [],
  selectedZipCode: "",
  inputName: "",
  inputPhoneNumber: "",
  inputDistrictWard: "",
  inputStreetName: "",
  inputNotes: "",
  selectedProvinceId: -1,
  selectedCityId: -1,
  selectedSubdistrictId: -1,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setModalTitle: (state, action: PayloadAction<IModalTitle>) => {
      state.modalTitle = action.payload;
    },
    setProvinces: (state, action: PayloadAction<IProvince[]>) => {
      state.provinces = action.payload;
    },
    setCities: (state, action: PayloadAction<ICity[]>) => {
      state.cities = action.payload;
    },
    setSubdistricts: (state, action: PayloadAction<ISubdistrict[]>) => {
      state.subdistricts = action.payload;
    },
    setSelectedZipCode: (state, action: PayloadAction<string>) => {
      state.selectedZipCode = action.payload;
    },
    setinputName: (state, action: PayloadAction<string>) => {
      state.inputName = action.payload;
    },
    setInputPhoneNumber: (state, action: PayloadAction<string>) => {
      state.inputPhoneNumber = action.payload;
    },
    setinputDistrictWard: (state, action: PayloadAction<string>) => {
      state.inputDistrictWard = action.payload;
    },
    setInputStreetName: (state, action: PayloadAction<string>) => {
      state.inputStreetName = action.payload;
    },
    setInputNotes: (state, action: PayloadAction<string>) => {
      state.inputNotes = action.payload;
    },
    setSelectedProvinceId: (state, action: PayloadAction<number>) => {
      state.selectedProvinceId = action.payload;
    },
    setSelectedCityId: (state, action: PayloadAction<number>) => {
      state.selectedCityId = action.payload;
    },
    setSelectedSubdistrictId: (state, action: PayloadAction<number>) => {
      state.selectedSubdistrictId = action.payload;
    },
  },
});

export const {
  setModalTitle,
  setProvinces,
  setCities,
  setSubdistricts,
  setSelectedZipCode,
  setinputName,
  setInputPhoneNumber,
  setinputDistrictWard,
  setInputStreetName,
  setInputNotes,
  setSelectedProvinceId,
  setSelectedCityId,
  setSelectedSubdistrictId,
} = addressSlice.actions;

export default addressSlice.reducer;
