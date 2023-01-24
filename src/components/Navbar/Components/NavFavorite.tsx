import { Button } from "@chakra-ui/react";
import Icon from "../../../assets/icons";

function NavFavorite() {
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
