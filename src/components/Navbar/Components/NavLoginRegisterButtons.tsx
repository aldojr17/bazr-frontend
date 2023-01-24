import { Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import routes from "../../../routes/Routes";

function NavLoginRegisterButtons() {
  const navigate = useNavigate();

  return (
    <HStack alignItems={"center"}>
      <Button
        variant={"basicOutline"}
        size={"sm"}
        onClick={() => navigate(routes.LOGIN)}
      >
        Login
      </Button>
      <Button
        variant={"primary"}
        size={"sm"}
        onClick={() => navigate(routes.REGISTER)}
      >
        Register
      </Button>
    </HStack>
  );
}

export default NavLoginRegisterButtons;
