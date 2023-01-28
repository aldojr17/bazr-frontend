import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { useEffect } from "react";
import useAddress from "../../hooks/useAddress";
import * as Yup from "yup";
import {
  EModalTitle,
  IAddNewAddressRequestPayload,
  IEditAddressRequestPayload,
  IFormAddNewAddress,
  IFormEditAddress,
  IPropsAddressModalBody,
} from "../../interfaces/Address";

type TSetFieldValue = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => void;

function AddressModalBody(props: IPropsAddressModalBody) {
  const {
    modalTitle,
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
    updateAddress,
  } = useAddress();

  const myConst = {
    idUnset: -1,
    stringUnset: "",
    NAME: "name",
    PHONE_NUMBER: "phoneNumber",
    PROVINCE: "province",
    CITY: "city",
    SUBDISTRICT: "subdistrict",
    ZIP_CODE: "zipcode",
    DISTRICT_WARD: "districtward",
    STREET_NAME: "streetname",
    NOTES: "notes",
  };

  useEffect(() => {
    const _useEffectAsync = async () => {
      await fetchProvinces();
      if (selectedProvinceId !== myConst.idUnset) {
        fetchCities(selectedProvinceId);
        if (selectedCityId !== myConst.idUnset) {
          const _subdistricts = await fetchSubdistricts(selectedCityId);
          if (!_subdistricts) {
            return;
          }
          const selectedSubdistrict = _subdistricts.find((subdistrict) => {
            return subdistrict.subdistrict_id === selectedSubdistrictId;
          });
          if (selectedSubdistrict) {
            setSelectedZipCode(selectedSubdistrict.zip_code);
          }
        }
      }
    };
    _useEffectAsync();
  }, [
    myConst.idUnset,
    selectedProvinceId,
    selectedCityId,
    selectedSubdistrictId,
  ]);

  const _validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(8, "Must be at least 8 characters")
      .max(13, "Must be less then 13 characters")
      .matches(/^8.*/, "Invalid"),
    province: Yup.number()
      .required("Required")
      .min(0, "Please select province"),
    city: Yup.number().required("Required").min(0, "Please select city"),
    subdistrict: Yup.number()
      .required("Required")
      .min(0, "Please select subdistrict"),
    zipcode: Yup.string(),
    districtward: Yup.string().required("Required"),
    streetname: Yup.string().required("Required"),
    notes: Yup.string(),
  });

  const _mapFormToRequestPayload = (
    formValues: IFormAddNewAddress | IFormEditAddress
  ) => {
    formValues.zipcode = selectedZipCode;
    const _subdistrict = subdistricts.find((subdistrict) => {
      return subdistrict.subdistrict_id === selectedSubdistrictId;
    });
    let subdistrictName = "";
    if (_subdistrict) {
      subdistrictName = _subdistrict.subdistrict;
    }
    const reqPayload:
      | IAddNewAddressRequestPayload
      | IEditAddressRequestPayload = {
      province_id: formValues.province,
      city_id: formValues.city,
      sub_district: subdistrictName,
      district_ward: formValues.districtward,
      zip_code: selectedZipCode,
      notes: formValues.notes,
      street_name: formValues.streetname,
      recipient_name: formValues.name,
      recipient_phone: `+62${formValues.phoneNumber}`,
    };
    return reqPayload;
  };

  const _editAddress = (formValues: IFormAddNewAddress, addressId: number) => {
    const editAddressReqPayload: IEditAddressRequestPayload =
      _mapFormToRequestPayload(formValues);
    updateAddress(addressId, editAddressReqPayload);
    props.setRefetchUserAddress(Math.random());
    props.onClose();
  };

  const _addNewAddress = (formValues: IFormAddNewAddress) => {
    const addNewAddressReqPayload: IAddNewAddressRequestPayload =
      _mapFormToRequestPayload(formValues);
    addNewAddress(addNewAddressReqPayload);
    props.setRefetchUserAddress(Math.random());
    props.onClose();
  };

  const changeInputName = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: TSetFieldValue
  ) => {
    setinputName(e.target.value);
    setFieldValue(myConst.NAME, e.target.value);
  };

  const changeInputPhoneNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: TSetFieldValue
  ) => {
    setInputPhoneNumber(e.target.value);
    setFieldValue(myConst.PHONE_NUMBER, e.target.value);
  };

  const changeSelectedProvinceId = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: TSetFieldValue
  ) => {
    const province_id = parseInt(e.target.value);
    fetchCities(province_id);
    setFieldValue(myConst.PROVINCE, province_id);
    setSelectedProvinceId(province_id);
    setFieldValue(myConst.CITY, myConst.idUnset);
    setSelectedCityId(myConst.idUnset);
    setFieldValue(myConst.SUBDISTRICT, myConst.idUnset);
    setSelectedSubdistrictId(myConst.idUnset);
    setSelectedZipCode(myConst.stringUnset);
  };

  const changeSelectedCityId = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: TSetFieldValue
  ) => {
    const city_id = parseInt(e.target.value);
    fetchSubdistricts(city_id);
    setFieldValue(myConst.CITY, city_id);
    setSelectedCityId(city_id);
    setFieldValue(myConst.SUBDISTRICT, myConst.idUnset);
    setSelectedSubdistrictId(myConst.idUnset);
    setSelectedZipCode(myConst.stringUnset);
  };

  const changeSelectedSubdistrictId = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: TSetFieldValue
  ) => {
    const subdistrict_id = parseInt(e.target.value);
    setFieldValue(myConst.SUBDISTRICT, subdistrict_id);
    setSelectedSubdistrictId(subdistrict_id);
    const _subdistrict = subdistricts.find((subdistrict) => {
      return subdistrict.subdistrict_id === subdistrict_id;
    });
    if (_subdistrict) {
      setSelectedZipCode(_subdistrict.zip_code);
    }
  };

  const changeInputDistrictWard = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: TSetFieldValue
  ) => {
    setinputDistrictWard(e.target.value);
    setFieldValue(myConst.DISTRICT_WARD, e.target.value);
  };

  const changeInputStreetName = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: TSetFieldValue
  ) => {
    setInputStreetName(e.target.value);
    setFieldValue(myConst.STREET_NAME, e.target.value);
  };

  const changeInputNotes = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: TSetFieldValue
  ) => {
    setInputNotes(e.target.value);
    setFieldValue(myConst.NOTES, e.target.value);
  };

  const getModalActionText = () => {
    if (modalTitle.title === EModalTitle.ADD_NEW_ADDRESS) {
      return "Save New Address";
    }
    return "Save Edit";
  };

  return (
    <Box>
      <Formik
        initialValues={{
          name: inputName,
          phoneNumber: inputPhoneNumber,
          province: selectedProvinceId,
          city: selectedCityId,
          subdistrict: selectedSubdistrictId,
          zipcode: selectedZipCode,
          districtward: inputDistrictWard,
          streetname: inputStreetName,
          notes: inputNotes,
        }}
        validationSchema={_validationSchema}
        onSubmit={(formValues) => {
          if (modalTitle.title === EModalTitle.EDIT_ADDRESS) {
            _editAddress(formValues, modalTitle.addressId);
          } else {
            _addNewAddress(formValues);
          }
        }}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap={5}>
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel>Name</FormLabel>
                <Field
                  as={Input}
                  variant="flushed"
                  placeholder="John Doe"
                  name={myConst.NAME}
                  value={inputName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeInputName(e, setFieldValue);
                  }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.phoneNumber && touched.phoneNumber}
              >
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+62" />
                  <Field
                    as={Input}
                    variant="flushed"
                    type="number"
                    paddingStart={3}
                    placeholder="82198765432"
                    name={myConst.PHONE_NUMBER}
                    value={inputPhoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeInputPhoneNumber(e, setFieldValue);
                    }}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.province && touched.province}>
                <FormLabel>Province</FormLabel>
                <Field
                  as={Select}
                  variant="filled"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    changeSelectedProvinceId(e, setFieldValue);
                  }}
                  name={myConst.PROVINCE}
                >
                  <option disabled value={myConst.idUnset}>
                    Select Province
                  </option>
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.province}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.city && touched.city}
                isDisabled={selectedProvinceId === myConst.idUnset}
              >
                <FormLabel>City</FormLabel>
                <Field
                  as={Select}
                  variant="filled"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    changeSelectedCityId(e, setFieldValue);
                  }}
                  name={myConst.CITY}
                >
                  <option disabled value={myConst.idUnset}>
                    Select City
                  </option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {`${city.type} ${city.city}`}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.city}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.subdistrict && touched.subdistrict}
                isDisabled={selectedCityId === myConst.idUnset}
              >
                <FormLabel>Subdistrict</FormLabel>
                <Field
                  as={Select}
                  variant="filled"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    changeSelectedSubdistrictId(e, setFieldValue);
                  }}
                  name={myConst.SUBDISTRICT}
                >
                  <option disabled value={myConst.idUnset}>
                    Select Subdistrict
                  </option>
                  {subdistricts.map((subdistrict) => (
                    <option
                      key={subdistrict.subdistrict_id}
                      value={subdistrict.subdistrict_id}
                    >
                      {subdistrict.subdistrict}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.subdistrict}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.zipcode && touched.zipcode}
                isDisabled={true}
              >
                <FormLabel>Zip Code</FormLabel>
                <Field
                  as={Input}
                  variant="flushed"
                  name={myConst.ZIP_CODE}
                  value={selectedZipCode}
                />
                <FormErrorMessage>{errors.zipcode}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.districtward && touched.districtward}
              >
                <FormLabel>District Ward</FormLabel>
                <Field
                  as={Input}
                  variant="flushed"
                  placeholder="Kelurahan Kelapa Gading Barat"
                  name={myConst.DISTRICT_WARD}
                  value={inputDistrictWard}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeInputDistrictWard(e, setFieldValue);
                  }}
                />
                <FormErrorMessage>{errors.districtward}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.streetname && touched.streetname}
              >
                <FormLabel>Street Name</FormLabel>
                <Field
                  as={Input}
                  variant="flushed"
                  placeholder="Jl. Pulau Putri RT.2 RW.9 No.12"
                  name={myConst.STREET_NAME}
                  value={inputStreetName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeInputStreetName(e, setFieldValue);
                  }}
                />
                <FormErrorMessage>{errors.streetname}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.notes && touched.notes}>
                <FormLabel>Notes</FormLabel>
                <Field
                  as={Input}
                  variant="flushed"
                  placeholder="House with white paint and black fence"
                  name={myConst.NOTES}
                  value={inputNotes}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    changeInputNotes(e, setFieldValue);
                  }}
                />
                <FormErrorMessage>{errors.notes}</FormErrorMessage>
              </FormControl>

              <Divider marginBottom={3} />

              <Flex justifyContent="end">
                <Button variant="outline" marginEnd={3} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button type="submit">{getModalActionText()}</Button>
              </Flex>
            </Flex>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AddressModalBody;
