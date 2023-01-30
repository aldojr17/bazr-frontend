import styled from "styled-components";

export const XScrollableWrapper = styled.div<{ showScrollbar?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding-bottom: 5px;
  overflow-x: scroll;

  &:hover {
    ::-webkit-scrollbar {
      height: 5px;
    }

    ::-webkit-scrollbar-track {
      display: ${(props) => (props.showScrollbar ? "flex" : "none")};
      box-shadow: inset 0 0 2px #4fd1c5;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #4fd1c5;
      border-radius: 10px;
    }
  }

  ::-webkit-scrollbar {
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;
