import { Tab } from "@chakra-ui/react";

function TabFilter(props: { text: string; onClick: () => void }) {
  return (
    <Tab
      w="max-content"
      whiteSpace="nowrap"
      _selected={{
        color: "primary",
        borderBottomColor: "primary",
      }}
      onClick={props.onClick}
    >
      {props.text}
    </Tab>
  );
}

export default TabFilter;
