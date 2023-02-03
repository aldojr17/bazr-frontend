import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Text,
  Image,
  useDisclosure,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import useUser from "../../hooks/useUser";
import Icon from "../../assets/icons";
import dayjs from "dayjs";
import EditUserPhoneModal from "../../components/Modal/EditUserPhoneModal";
import EditUserProfileModal from "../../components/Modal/EditUserProfileModal";
import EditUserEmailModal from "../../components/Modal/EditUserEmailModal";
import Pencil from "../../assets/icons/Pencil";
import EditUserPhotoModal from "../../components/Modal/EditUserPhotoModal";
import useTitle from "../../hooks/useTitle";
import EditUserChangePasswordModal from "../../components/Modal/EditUserChangePasswordModal";

function UserProfile() {
  useTitle("Profile | BAZR");
  const { user } = useUser();
  const emailModal = useDisclosure();
  const emailCodeModal = useDisclosure();
  const logoutModal = useDisclosure();
  const userModal = useDisclosure();
  const phoneModal = useDisclosure();
  const photoModal = useDisclosure();
  const changePasswordModal = useDisclosure();
  const changePasswordTokenModal = useDisclosure();
  const changePasswordLogoutModal = useDisclosure();

  return (
    <div>
      <Flex
        marginTop={4}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
      >
        <Box marginBottom={5} marginEnd={5} width={230} alignSelf="center">
          <Flex flexDirection={"column"}>
            <Card>
              <CardBody>
                <Flex flexDirection={"column"}>
                  <Image
                    height={"185px"}
                    borderRadius={"md"}
                    src={user?.profile_picture}
                    alt="profile picture"
                  />
                  <Button
                    marginTop={4}
                    height={50}
                    variant={"outline"}
                    borderWidth={1}
                    borderColor={"blackAlpha.300"}
                    color="blackAlpha.700"
                    onClick={photoModal.onOpen}
                  >
                    Change Photo
                  </Button>
                </Flex>
              </CardBody>
            </Card>
            <Button
              height={50}
              marginTop={4}
              variant={"outline"}
              borderWidth={1}
              borderColor={"blackAlpha.300"}
              color={"blackAlpha.700"}
              leftIcon={<Icon.Lock fill="blackAlpha.700" />}
              onClick={changePasswordModal.onOpen}
            >
              <Text width={"100%"}>Change Password</Text>
            </Button>
            <Button
              marginTop={2}
              height={50}
              variant={"outline"}
              borderWidth={1}
              borderColor={"blackAlpha.300"}
              color={"blackAlpha.700"}
              leftIcon={<Icon.Pencil fill="blackAlpha.700" />}
              onClick={userModal.onOpen}
            >
              <Text width={"100%"}>Update Profile</Text>
            </Button>
          </Flex>
        </Box>

        <Box padding={5}>
          <Text fontWeight={"semibold"} marginBottom={4} fontSize="md">
            Profile
          </Text>
          <SimpleGrid columns={2} spacing={4}>
            <Text fontWeight={"light"} fontSize="md">
              Username
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              {user?.username}
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              Name
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              {user?.name}
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              Date of Birth
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              {user?.birth_date
                ? dayjs(user?.birth_date).format("DD MMMM YYYY")
                : "-"}
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              Gender
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              {user?.gender_detail.id === 0 ? "-" : user?.gender_detail.name}
            </Text>
          </SimpleGrid>

          <Text fontWeight={"semibold"} marginY={4} fontSize="md">
            Contact
          </Text>
          <SimpleGrid columns={2} spacing={4}>
            <Text fontWeight={"light"} fontSize="md">
              Email
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              {user?.email}

              <Tooltip label="Change Email">
                <IconButton
                  variant={"link"}
                  size="xs"
                  marginStart={2}
                  aria-label="Change Email"
                  icon={<Pencil fill={"primary"} />}
                  onClick={emailModal.onOpen}
                />
              </Tooltip>
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              Phone Number
            </Text>
            <Text fontWeight={"light"} fontSize="md">
              {user?.phone ?? "-"}

              <Tooltip label="Change Phone">
                <IconButton
                  variant={"link"}
                  size="xs"
                  marginStart={2}
                  aria-label="Change Phone"
                  icon={<Pencil fill={"primary"} />}
                  onClick={phoneModal.onOpen}
                />
              </Tooltip>
            </Text>
          </SimpleGrid>
        </Box>
      </Flex>

      <EditUserEmailModal
        isOpen={emailModal.isOpen}
        onClose={emailModal.onClose}
        email={user?.email ?? ""}
        codeModalIsOpen={emailCodeModal.isOpen}
        codeModalOnClose={emailCodeModal.onClose}
        codeModalOnOpen={emailCodeModal.onOpen}
        logoutModalIsOpen={logoutModal.isOpen}
        logoutModalOnOpen={logoutModal.onOpen}
        logoutModalOnClose={logoutModal.onClose}
      />

      <EditUserChangePasswordModal
        isOpen={changePasswordModal.isOpen}
        onClose={changePasswordModal.onClose}
        tokenModalIsOpen={changePasswordTokenModal.isOpen}
        tokenModalOnClose={changePasswordTokenModal.onClose}
        tokenModalOnOpen={changePasswordTokenModal.onOpen}
        logoutModalIsOpen={changePasswordLogoutModal.isOpen}
        logoutModalOnOpen={changePasswordLogoutModal.onOpen}
        logoutModalOnClose={changePasswordLogoutModal.onClose}
      />

      <EditUserProfileModal
        isOpen={userModal.isOpen}
        onClose={userModal.onClose}
        username={user?.username ?? ""}
        name={user?.name ?? ""}
        birth_date={user?.birth_date ?? ""}
        gender_id={user?.gender_detail.id ?? ""}
      />

      <EditUserPhoneModal
        isOpen={phoneModal.isOpen}
        onClose={phoneModal.onClose}
        phone={user?.phone ?? ""}
      />

      <EditUserPhotoModal
        isOpen={photoModal.isOpen}
        onClose={photoModal.onClose}
      />
    </div>
  );
}

export default UserProfile;
