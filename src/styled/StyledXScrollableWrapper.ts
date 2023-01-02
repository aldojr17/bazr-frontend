import styled from "styled-components";

export const XScrollableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding-bottom: 5px;
  overflow-x: scroll;

  &:hover {
    ::-webkit-scrollbar {
      height: 5px;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px #319795;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #38b2ac;
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
    background: white;
  }
`;
