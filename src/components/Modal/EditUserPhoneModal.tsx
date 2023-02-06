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
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { IEditUserPhoneModalProps } from "../../interfaces/Components";

function EditUserPhoneModal(props: IEditUserPhoneModalProps) {
  const phoneValidationSchema = Yup.object().shape({
    phone: Yup.number().required("Required"),
  });

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Phone Number</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              phone: props.phone,
            }}
            validationSchema={phoneValidationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormControl isInvalid={!!errors.phone && touched.phone}>
                      <Field
                        as={Input}
                        placeholder="Phone"
                        type="number"
                        name="phone"
                      />
                      <FormErrorMessage>{errors.phone}</FormErrorMessage>
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

export default EditUserPhoneModal;
