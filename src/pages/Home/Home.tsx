import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import useIsLogged from "../../util/useIsLogged";
import { RootState } from "../../redux";
import DivCategory, {
  AddToCartButton,
  ButtonWrapper,
  HomeImg,
  HomeWrapper,
  MenuTitle,
} from "./style";
import { formatCurrency } from "../../util/util";
import { CartDispatch } from "../../redux/cart/types";
import { addToCart, deleteAllFromCart } from "../../redux/cart/action";
import { useNavigate } from "react-router-dom";
import { IFilterPayload } from "../../interfaces/Filter";
import Icon from "../../assets/icons";

const Home = () => {
  const dispatchCart: CartDispatch = useDispatch();

  const navigate = useNavigate();
  const isLogged = useIsLogged();

  const [filter, setFilter] = useState<IFilterPayload>({
    category: 1,
    limit: 4,
  });
  const [index, setIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleClick = (id: number) => {
    setFilter({ ...filter, category: id });
  };

  const handleAddToCart = () => {
    // if (!isLogged) {
    //   navigate("/login", { replace: true });
    //   return;
    // }

    // dispatchCart(
    //   addToCart({
    //     menu_id: index,
    //     option_id: 0,
    //     order_id: 0,
    //     qty: 1,
    //   })
    // );

    // setShowToast(true);

    // setTimeout(() => {
    //   setShowToast(false);
    // }, 3000);
    dispatchCart(deleteAllFromCart());
  };

  return (
    <div className="pb-5">
      <HomeWrapper className="container px-5 mx-auto position-relative">
        <div className="row align-items-center">
          <div className="col-lg-6 pt-5">
            <h3>NEW IN MENU</h3>
          </div>
          <div className="col-lg-6 pt-5">
            <HomeImg
              src={"/assets/no-image-available.png"}
              className="w-100"
              alt="menu"
            />
          </div>
        </div>
        <ButtonWrapper className="bg-dark text-white d-flex position-relative align-items-center col-lg-4">
          <div className="px-3">
            <span className="fs-3">Only</span>
          </div>
          <AddToCartButton
            className="btn border-2 border border-dark rounded-circle fs-1 p-0 d-flex justify-content-center align-items-center position-absolute btn-light pb-1"
            onClick={handleAddToCart}
          >
            +
          </AddToCartButton>
        </ButtonWrapper>
        <div className="d-flex align-items-center mt-4 gap-3">
          <button
            className="btn p-0"
            onClick={() => {
              index - 1 < 0 ? setIndex(2) : setIndex((index) => index - 1);
            }}
          >
            <Icon.LeftIcon />
          </button>
          <span className="pt-1">0{index + 1} / 03</span>
          <button
            className="btn p-0"
            onClick={() => {
              index + 1 > 2 ? setIndex(0) : setIndex((index) => index + 1);
            }}
          >
            <Icon.RightIcon />
          </button>
        </div>
      </HomeWrapper>
      <div className="container">
        <DivCategory className="d-flex flex-column flex-wrap justify-content-center"></DivCategory>
      </div>
      <div className="container mx-auto d-flex justify-content-center mt-3">
        <button
          className="btn btn-dark"
          onClick={() => {
            navigate("/menu", { replace: true });
          }}
        >
          See All Menu
        </button>
      </div>
    </div>
  );
};

export default Home;
