import {
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { IProductVariationListFormProps } from "../../interfaces/Components";

function ProductVariationListForm(props: IProductVariationListFormProps) {
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setVtList(
      props.vtList.map((vt, index) => {
        if (index === Number(event.target.id)) {
          return {
            ...vt,
            price: event.target.value,
          };
        }
        return vt;
      })
    );
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setVtList(
      props.vtList.map((vt, index) => {
        if (index === Number(event.target.id)) {
          return {
            ...vt,
            stock: event.target.value,
          };
        }
        return vt;
      })
    );
  };

  return (
    <>
      <Flex flexDirection={"row"} justifyContent={"space-between"} width="70%">
        <Text>Variation List</Text>
        <Flex width="70%" direction={"column"}>
          <Flex width="100%" direction={"column"} mt={5}>
            <TableContainer>
              <Table
                variant="basic"
                className="table table-bordered"
                borderColor={"gray.200"}
              >
                <Thead>
                  <Tr>
                    <Th>{props.vgInput[0]?.vg_name}</Th>
                    {props.secVariation ? (
                      <Th>{props.vgInput[1]?.vg_name}</Th>
                    ) : (
                      ""
                    )}
                    <Th>Price</Th>
                    <Th>Stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {props.secVariation
                    ? props.vtList.map((vt, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{vt.vtOne_name}</Td>
                            <Td>{vt.vtTwo_name}</Td>
                            <Td>
                              <Input
                                type="number"
                                placeholder="Input"
                                id={String(idx)}
                                onChange={handlePriceChange}
                                value={vt.price}
                              />
                            </Td>
                            <Td>
                              <Input
                                type="number"
                                id={String(idx)}
                                placeholder="Input"
                                onChange={handleStockChange}
                                value={vt.stock}
                              />
                            </Td>
                          </Tr>
                        );
                      })
                    : props.vtList.map((vt, idx) => {
                        return (
                          <Tr key={idx}>
                            <Td>{vt.vtOne_name}</Td>
                            <Td>
                              <Input
                                type="number"
                                placeholder="Input"
                                id={String(idx)}
                                onChange={handlePriceChange}
                                value={vt.price}
                              />
                            </Td>
                            <Td>
                              <Input
                                type="number"
                                placeholder="Input"
                                onChange={handleStockChange}
                                value={vt.stock}
                              />
                            </Td>
                          </Tr>
                        );
                      })}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default ProductVariationListForm;
