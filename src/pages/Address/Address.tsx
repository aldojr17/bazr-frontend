import { Box, Button, Divider, Flex, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAddress from "../../hooks/useAddress";
import useUser from "../../hooks/useUser";
import { EModalTitle } from "../../interfaces/Address";
import { IUserAddress } from "../../interfaces/User";
import AddressItem from "./AddressItem";
import AddressModal from "./AddressModal";

function Address() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setModalTitle, resetFormState } = useAddress();
  const { getUserAddresses } = useUser();

  const [userAddresses, setUserAddresses] = useState<IUserAddress[]>([]);
  const [refetchUserAddress, setRefetchUserAddress] = useState(0);

  const openModalToAddNewAddress = () => {
    setModalTitle({ title: EModalTitle.ADD_NEW_ADDRESS, addressId: -1 });
    onOpen();
  };

  useEffect(() => {
    const _useEffectAsync = async () => {
      const response = await getUserAddresses();
      setUserAddresses(response.data);
    };
    _useEffectAsync();
  }, [refetchUserAddress]);

  const _onClose = () => {
    resetFormState();
    onClose();
  };

  return (
    <Box>
      <Flex direction="column">
        <Flex padding={2} alignItems="center">
          <Flex grow={1} fontSize="xl" fontWeight="bold">
            My Address
          </Flex>
          <Button onClick={openModalToAddNewAddress}>+ Add New Address</Button>
        </Flex>
        <Divider marginBottom={5} borderWidth="2px" />
        <Box paddingBottom={4}>
          {userAddresses.map((address, i) => (
            <Box key={`${address.address_id};${i}`}>
              <AddressItem
                address={address}
                onOpen={onOpen}
                refetchUserAddress={() => {
                  setRefetchUserAddress(Math.random());
                }}
              />
            </Box>
          ))}
        </Box>
      </Flex>
      <AddressModal
        isOpen={isOpen}
        onClose={_onClose}
        setRefetchUserAddress={setRefetchUserAddress}
      />
    </Box>
  );
}

export default Address;
