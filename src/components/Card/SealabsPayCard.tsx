import {
  Card,
  Heading,
  CardBody,
  Text,
  Flex,
  Button,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import Trash from "../../assets/icons/Trash";
import useSealabsPay from "../../hooks/useSealabsPay";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import { ISealabsPayCardProps } from "../../interfaces/Components";

const SealabsPayCard = (props: ISealabsPayCardProps) => {
  let activeDateParsed = new Date(props.activeDate);
  const { updateDefaultSealabsPay, setChosenSealabsPay, deleteASealabsPay } =
    useSealabsPay();
  const { successToast, errorToast } = useToast();
  const { fetchProfile } = useUser();

  return (
    <>
      <Card
        variant={"elevated"}
        cursor="pointer"
        onClick={props.onClick}
        backgroundColor={props.chosen}
      >
        <CardBody>
          <Flex justifyContent={"space-between"}>
            <Flex direction={"column"}>
              <Heading size="xs">{props.nameOnCard}</Heading>
              <Text fontSize="md" textTransform={"uppercase"}>
                {props.cardNumber}
              </Text>

              <Text fontSize="xs">
                Active Date:{" "}
                <strong>{activeDateParsed.toLocaleString()}</strong>
              </Text>
            </Flex>
            <Flex direction={"column"} justifyContent="space-between">
              {!props.isDefault ? (
                <Button
                  onClick={() =>
                    updateDefaultSealabsPay({
                      default_sealabs_pay_id: props.id,
                    })
                      .then((response) => {
                        if (response.is_success) {
                          successToast(
                            "Successfully updated your default account!"
                          );
                          setChosenSealabsPay({
                            id: props.id,
                            user_id: props.user_id,
                            name_on_card: props.nameOnCard,
                            card_number: props.cardNumber,
                            active_date: props.activeDate,
                          });
                        } else {
                          errorToast("Failed to set your default account");
                        }
                      })
                      .then(() => fetchProfile())
                  }
                  size={"xs"}
                >
                  Set Default
                </Button>
              ) : (
                <Badge alignSelf={"start"} colorScheme="yellow" ml={1}>
                  Default
                </Badge>
              )}
              <Tooltip hasArrow label="Delete!">
                <Button
                  size={"sm"}
                  bgColor={"red"}
                  p={0}
                  alignSelf={"end"}
                  onClick={() =>
                    deleteASealabsPay({ sealabs_pay_id: props.id }).then(
                      (res) => {
                        if (res?.is_success) {
                          successToast(
                            "Successfully deleted your sealabs pay account!"
                          );
                          setChosenSealabsPay({
                            id: 0,
                            user_id: 0,
                            card_number: "",
                            active_date: "",
                            name_on_card: "",
                          });
                        } else {
                          errorToast("Failed to delete your account");
                        }
                      }
                    )
                  }
                >
                  <Trash fill={"white"} />
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default SealabsPayCard;
