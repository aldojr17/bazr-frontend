import { Box, Divider, Flex, Text, Tooltip } from "@chakra-ui/react";
import Icon from "../../assets/icons";
import useAddress from "../../hooks/useAddress";
import useUser from "../../hooks/useUser";
import { EModalTitle, IPropsAddressItem } from "../../interfaces/Address";
import { IUserAddress } from "../../interfaces/User";
import Tag from "./Tag";

function AddressItem(props: IPropsAddressItem) {
  const {
    setModalTitle,
    setinputName,
    cleanInputPhoneNumber,
    setInputPhoneNumber,
    setSelectedProvinceId,
    setSelectedCityId,
    setinputDistrictWard,
    setInputStreetName,
    setInputNotes,
    updateUserDefaultAddress,
    updateShopDefaultAddress,
  } = useAddress();
  const { user } = useUser();

  const setAddressState = (address: IUserAddress): void => {
    setinputName(address.recipient_name);
    setInputPhoneNumber(cleanInputPhoneNumber(address.recipient_phone));
    setSelectedProvinceId(address.province_id);
    setSelectedCityId(address.city_id);
    setinputDistrictWard(address.district_ward);
    setInputStreetName(address.street_name);
    setInputNotes(address.notes);
  };

  const openModalToEditAddress = (address_id: number) => {
    setModalTitle({ title: EModalTitle.EDIT_ADDRESS, addressId: address_id });
    setAddressState(props.address);
    props.onOpen();
  };

  const getAddressTags = (address: IUserAddress): string[] => {
    const addressTags: string[] = [];
    if (address.is_default) {
      addressTags.push("Default Shipping");
    }
    if (address.is_shop_default) {
      addressTags.push("Shop Location");
    }
    return addressTags;
  };

  const getFormattedAddress = (address: IUserAddress): string => {
    return `${address.province_name}, ${address.city_name}, ${address.sub_district}, ${address.district_ward}, ${address.zip_code}`;
  };

  return (
    <Box>
      <Flex padding={2} paddingTop={5} alignItems="center">
        <Flex grow={1} direction="column">
          <Flex marginBottom={3} height="20px" alignItems="center">
            <Flex fontWeight="bold">{props.address.recipient_name}</Flex>
            <Divider marginX={3} orientation="vertical" />
            <Flex>{props.address.recipient_phone}</Flex>
          </Flex>
          <Flex direction="column">
            <Text>{props.address.street_name}</Text>
            <Text>{props.address.notes}</Text>
            <Text>{getFormattedAddress(props.address)}</Text>
          </Flex>
          <Flex>
            {getAddressTags(props.address).map((tag, i) => (
              <Box key={i} paddingY={1} paddingEnd={1}>
                <Tag text={tag} />
              </Box>
            ))}
          </Flex>
        </Flex>
        <Flex gap={5}>
          <Tooltip hasArrow label="Set as Default Shipping">
            <Box
              onClick={() => {
                updateUserDefaultAddress({
                  address_id: props.address.address_id,
                });
                props.refetchUserAddress();
              }}
              cursor="pointer"
            >
              <Icon.PinMap />
            </Box>
          </Tooltip>
          {user?.is_seller ? (
            <Tooltip hasArrow label="Set as Shop Location">
              <Box
                onClick={() => {
                  updateShopDefaultAddress({
                    address_id: props.address.address_id,
                  });
                  props.refetchUserAddress();
                }}
                cursor="pointer"
              >
                <Icon.Shop />
              </Box>
            </Tooltip>
          ) : (
            ""
          )}
          <Tooltip hasArrow label="Edit Address">
            <Box
              onClick={() => openModalToEditAddress(props.address.address_id)}
              cursor="pointer"
            >
              <Icon.Pencil />
            </Box>
          </Tooltip>
        </Flex>
      </Flex>
      <Divider borderWidth={"thin"} />
    </Box>
  );
}

export default AddressItem;
