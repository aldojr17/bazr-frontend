import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../assets/icons";
import routes from "../../../routes/Routes";

function NavFavorite() {
  const navigate = useNavigate();

  return (
    <Button
      display={{
        base: "none",
        sm: "none",
        md: "none",
        lg: "block",
        xl: "block",
      }}
      variant={"ghost"}
      p={{
        base: 0,
        sm: "initial",
        md: "initial",
        lg: "initial",
        xl: "initial",
      }}
      onClick={() => navigate(routes.FAVORITE)}
    >
      <Icon.Heart
        width={{
          base: "1.2em",
          sm: "1.4em",
          md: "1.4em",
          lg: "1.4em",
          xl: "1.4em",
        }}
        height={{
          base: "1.2em",
          sm: "1.4em",
          md: "1.4em",
          lg: "1.4em",
          xl: "1.4em",
        }}
      />
    </Button>
  );
}

export default NavFavorite;
