import { useToast as chakraToast } from "@chakra-ui/react";

const useToast = () => {
  const toast = chakraToast();

  const successToast = (message: string, duration?: number) => {
    toast({
      title: message,
      status: "success",
      duration: duration ?? 3000,
      position: "top",
      variant: "successToast",
      isClosable: true,
      containerStyle: {
        marginTop: { base: "10px", lg: "100px" },
      },
    });
  };

  const errorToast = (
    message: string,
    description?: string,
    duration?: number
  ) => {
    toast({
      title: message,
      description: description,
      status: "error",
      duration: duration ?? 3000,
      position: "top",
      variant: "errorToast",
      isClosable: true,
      containerStyle: {
        marginTop: "100px",
      },
    });
  };

  const infoToast = (message: string, duration?: number) => {
    toast({
      title: message,
      status: "info",
      duration: duration ?? 3000,
      position: "top",
      variant: "infoToast",
      isClosable: true,
      containerStyle: {
        marginTop: "100px",
      },
    });
  };

  return { successToast, errorToast, infoToast };
};

export default useToast;
