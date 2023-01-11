import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { IEditUserEmailModalProps } from "../../interfaces/Components";

function EditUserEmailModal(props: IEditUserEmailModalProps) {
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email().required("Required"),
  });

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Email</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              email: props.email,
            }}
            validationSchema={emailValidationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isInvalid={!!errors.email && touched.email}>
                      <Field as={Input} placeholder="Email" name="email" />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button type="submit">Save</Button>
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

export default EditUserEmailModal;
