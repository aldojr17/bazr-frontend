import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { IPropsTableData } from "../../interfaces/Transaction";

function TableData({ rows }: IPropsTableData) {
  return rows.length > 0 ? (
    <Box>
      <TableContainer>
        <Table size="md" variant="unstyled">
          <Tbody>
            {rows.map((row, index) => (
              <Tr key={`${row.key};${index}`}>
                <Td paddingY={1} paddingEnd={0}>
                  <Flex
                    fontSize={row.fontSizeKey}
                    fontWeight={row.fontWeightKey}
                  >
                    {row.key}
                    {row.addOn}
                  </Flex>
                </Td>
                <Td paddingY={1} paddingX={2}>
                  <Flex flexGrow={0} flexShrink={1}>
                    :
                  </Flex>
                </Td>
                <Td paddingY={1} paddingStart={0}>
                  <Flex
                    fontSize={row.fontSizeValue}
                    color={row.colorValue}
                    justifyContent={row.justifyContentValue}
                    fontWeight={row.fontWeightValue}
                  >
                    {row.value}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <Flex></Flex>
  );
}

export default TableData;
