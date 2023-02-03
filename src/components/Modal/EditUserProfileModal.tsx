import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import useUser from "../../hooks/useUser";
import { IEditUserProfileModalProps } from "../../interfaces/Components";
import { IEditProfilePayload } from "../../interfaces/User";

function EditUserProfileModal(props: IEditUserProfileModalProps) {
  const { fetchProfile, editProfile } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const userValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z0-9]*$/, "Must not contain any space"),
    name: Yup.string().required("Required"),
    birth_date: Yup.string(),
    gender: Yup.number(),
  });

  const handleSubmitEditProfile = async (payload: IEditProfilePayload) => {
    setIsLoading(true);

    const response = await editProfile(payload);
    if (response.is_success) {
      props.onClose();
      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchProfile();
    } else {
      toast({
        title: response.message ?? "error edit profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />

          <Formik
            initialValues={{
              username: props.username,
              name: props.name,
              birth_date: props.birth_date
                ? dayjs(props.birth_date).format("YYYY-MM-DD")
                : "",
              gender: props.gender_id,
            }}
            validationSchema={userValidationSchema}
            onSubmit={(values) => {
              const payload: IEditProfilePayload = {
                name: values.name,
                username: values.username,
                birth_date: values.birth_date,
                gender_id: Number(values.gender),
                profile_picture: null,
              };
              handleSubmitEditProfile(payload);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <ModalBody pb={6}>
                  <FormControl
                    isInvalid={!!errors.username && touched.username}
                  >
                    <FormLabel>Username</FormLabel>
                    <Field as={Input} placeholder="Username" name="username" />
                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                  </FormControl>

                  <FormControl mt={4} isInvalid={!!errors.name && touched.name}>
                    <FormLabel>Name</FormLabel>
                    <Field as={Input} placeholder="Name" name="name" />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={!!errors.birth_date && touched.birth_date}
                  >
                    <FormLabel>Birth Date</FormLabel>
                    <Field
                      as={Input}
                      placeholder="Select Date"
                      name="birth_date"
                      type="date"
                    />
                    <FormErrorMessage>{errors.birth_date}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={!!errors.gender && touched.gender}
                  >
                    <FormLabel>Gender</FormLabel>
                    <Field
                      as={Select}
                      placeholder="Select option"
                      name="gender"
                      borderWidth={1}
                      borderColor={"blackAlpha.200"}
                      fontWeight={"normal"}
                    >
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Field>
                    <FormErrorMessage>{errors.gender}</FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    type="submit"
                    _hover={{
                      bg: "grey",
                    }}
                    isLoading={isLoading}
                    loadingText="Loading"
                  >
                    Save
                  </Button>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditUserProfileModal;
