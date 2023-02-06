import styled from "styled-components";

import Indicator from "./Indicator";

const Carousel = {
  Carousel: styled.div`
    padding: 20px 0px;

    @media only screen and (min-width: 48em) {
      padding: 30px 0px;
    }

    @media only screen and (min-width: 62em) {
      padding: 40px 0px;
    }
  `,

  Container: styled.div`
    box-shadow: -10px -10px 20px #fafbff, 8px 10px 20px #a6abbd;

    border-radius: 10px;

    @media only screen and (min-width: 48em) {
      border-radius: 20px;
    }

    @media only screen and (min-width: 62em) {
      border-radius: 30px;
    }
  `,

  Title: styled.button`
    text-decoration: none;

    &:hover {
      color: #192e51 !important;
    }
  `,

  Image: styled.img`
    aspect-ratio: 21 / 7;
    object-fit: cover;
    box-shadow: 5px 10px 25px #a6abbd;
  `,

  Indicator: Indicator,
};

export default Carousel;
