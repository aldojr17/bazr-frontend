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
} from "@chakra-ui/react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { IEditUserPhotoModalProps } from "../../interfaces/Components";
import useUser from "../../hooks/useUser";
import {
  IEditProfilePayload,
  IUploadAvatarPayload,
} from "../../interfaces/User";
import useToast from "../../hooks/useToast";

function EditUserPhotoModal(props: IEditUserPhotoModalProps) {
  const { user, fetchProfile, editProfile, uploadAvatar } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToast();

  const initialFormUpload: IUploadAvatarPayload = {
    photo: "",
  };

  const photoValidationSchema = Yup.object().shape({
    photo: Yup.mixed()
      .required("Required")
      .test("format", "Unsupported file format", (value) => {
        return ["image/png", "image/jpg", "image/jpeg"].includes(value?.type);
      })
      .test(
        "size",
        "Uploaded file is too big.",
        (value) => value && value.size <= 500000
      ),
  });

  const handleSubmitUploadPhoto = async (payload: IUploadAvatarPayload) => {
    setIsLoading(true);

    const response = await uploadAvatar(payload);
    if (response.is_success) {
      props.onClose();

      if (user !== null) {
        await editProfile({
          username: user.username,
          name: user.name,
          profile_picture: response.data,
        } as IEditProfilePayload);
      }

      successToast(response.message);

      fetchProfile();
    } else {
      errorToast(response.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Photo</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={initialFormUpload}
            validationSchema={photoValidationSchema}
            onSubmit={(values) => {
              handleSubmitUploadPhoto(values);
            }}
          >
            {({ handleSubmit, setFieldValue, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isInvalid={!!errors.photo && touched.photo}>
                      <FormLabel>
                        Format: (.jpeg .jpg .png) Max: (500kb)
                      </FormLabel>
                      <Input
                        name="photo"
                        accept=".jpg,.jpeg,.png"
                        className="form-control"
                        type={"file"}
                        onChange={(e) => {
                          if (e.currentTarget.files?.length) {
                            const photo = e.currentTarget.files[0];
                            setFieldValue("photo", photo);
                          }
                        }}
                      />

                      <FormErrorMessage>{errors.photo}</FormErrorMessage>
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
              </>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditUserPhotoModal;
