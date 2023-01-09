import styled from "styled-components";

const Indicator = styled.button`
  width: 15px !important;
  height: 15px !important;

  &.active {
    background-color: #ff2950;
  }

  &:hover {
    background-color: #607698 !important;
  }
`;

export default Indicator;
