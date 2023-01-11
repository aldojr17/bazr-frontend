import {
  Card,
  CardBody,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Transaction</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Voucher</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Stat>
              <StatLabel>Product</StatLabel>
              <StatNumber>0</StatNumber>
            </Stat>
          </CardBody>
        </Card>
      </Grid>
    </>
  );
}

export default Home;
