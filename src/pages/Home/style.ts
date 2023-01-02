import styled from "styled-components";
import { ICarouselItemIndexProps } from "../../interfaces/Components";

export const CarouselItemIndex = styled.div<ICarouselItemIndexProps>`
  padding: 0.1rem 1rem;
  background-color: ${(props) => (props.active ? "#212121" : "#a3a3a3")};
`;

export const CategoryWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-direction: row;
  gap: 2.5rem;

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 2px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #949494;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #949494;
  }
`;
