import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Icon from "../../assets/icons";
import { ISelectCategoryModalProps } from "../../interfaces/Components";

const SelectCategoryModal = (props: ISelectCategoryModalProps) => {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        size="6xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent p={8}>
          <ModalHeader>
            <Heading>Edit Category</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody width="100%" backgroundColor={"gray.100"} p={8} my={8}>
            <Flex direction={"row"} maxHeight="20rem">
              <Flex
                width="33%"
                direction="column"
                overflowY={"scroll"}
                backgroundColor="white"
              >
                {props.categories.map((cat) => {
                  return (
                    <Button
                      width="100%"
                      key={cat.id}
                      p={3}
                      justifyContent={"space-between"}
                      variant="ghost"
                      onClick={() => {
                        props.setSelectedCategory({
                          primaryCat: cat,
                          secondaryCat: undefined,
                          tertiaryCat: undefined,
                        });
                      }}
                    >
                      <Text maxWidth="90%" noOfLines={1} fontWeight={"medium"}>
                        {cat.name}
                      </Text>
                      <Icon.ChevronRight />
                    </Button>
                  );
                })}
              </Flex>
              <Flex
                width="33%"
                direction="column"
                overflowY={"scroll"}
                backgroundColor="white"
              >
                {props.selectedCategory.primaryCat?.secondary_category?.map(
                  (cat) => {
                    return (
                      <Button
                        width="100%"
                        key={cat.id}
                        p={3}
                        justifyContent={"space-between"}
                        variant="ghost"
                        onClick={() => {
                          props.setSelectedCategory({
                            ...props.selectedCategory,
                            secondaryCat: cat,
                            tertiaryCat: undefined,
                          });
                        }}
                      >
                        <Text
                          maxWidth="90%"
                          noOfLines={1}
                          fontWeight={"medium"}
                        >
                          {cat.name}
                        </Text>
                        <Icon.ChevronRight />
                      </Button>
                    );
                  }
                )}
              </Flex>
              <Flex
                width="33%"
                direction="column"
                overflowY={"scroll"}
                backgroundColor="white"
              >
                {props.selectedCategory.secondaryCat?.tertiary_category?.map(
                  (cat) => {
                    return (
                      <Button
                        width="100%"
                        p={3}
                        key={cat.id}
                        justifyContent={"space-between"}
                        variant="ghost"
                        onClick={() => {
                          props.setSelectedCategory({
                            ...props.selectedCategory,
                            tertiaryCat: cat,
                          });
                        }}
                      >
                        <Text
                          maxWidth="90%"
                          noOfLines={1}
                          fontWeight={"medium"}
                        >
                          {cat.name}
                        </Text>
                        <Icon.ChevronRight />
                      </Button>
                    );
                  }
                )}
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={"space-between"}>
            <Text fontSize={"lg"} fontWeight={"semibold"}>
              Selected Category:{" "}
              {props.selectedCategory.primaryCat?.name
                ? props.selectedCategory.primaryCat.name + " > "
                : "No Category Chosen"}
              {props.selectedCategory.secondaryCat?.name
                ? props.selectedCategory.secondaryCat.name + " > "
                : ""}
              {props.selectedCategory.tertiaryCat?.name
                ? props.selectedCategory.tertiaryCat.name
                : ""}
            </Text>
            <Flex justifyContent={"end"}>
              <Button
                variant="solid"
                colorScheme={"gray"}
                mr={3}
                onClick={() => {
                  props.setSelectedCategory({
                    primaryCat: undefined,
                    secondaryCat: undefined,
                    tertiaryCat: undefined,
                  });
                  props.onClose();
                }}
              >
                Close
              </Button>
              <Button
                variant="solid"
                colorScheme="orange"
                onClick={props.onClose}
              >
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SelectCategoryModal;
