import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

function Voucher() {
  return (
    <div>
      <Card variant={"outline"}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Heading size="md">Voucher List</Heading>
            <Button>Add Voucher</Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="striped">
              <TableCaption>Imperial to metric conversion factors</TableCaption>
              <Thead>
                <Tr>
                  <Th>Code</Th>
                  <Th>Name</Th>
                  <Th isNumeric>Quota</Th>
                  <Th isNumeric>Benefit</Th>
                  <Th isNumeric>Benefit Percentage</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                  <Td isNumeric>25.4</Td>
                  <Td isNumeric>25.4</Td>
                  <Td>
                    <Button bgColor={"yellow.300"} m={1}>
                      Edit
                    </Button>
                    <Button bgColor={"red"}>Delete</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                  <Td isNumeric>30.48</Td>
                  <Td isNumeric>30.48</Td>
                  <Td>
                    <Button bgColor={"yellow.300"} m={1}>
                      Edit
                    </Button>
                    <Button bgColor={"red"}>Delete</Button>
                  </Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td isNumeric>0.91444</Td>
                  <Td>
                    <Button bgColor={"yellow.300"} m={1}>
                      Edit
                    </Button>
                    <Button bgColor={"red"}>Delete</Button>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
}

export default Voucher;
