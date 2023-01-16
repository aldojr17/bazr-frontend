import { Box } from "@chakra-ui/react";
import {
  IFlatShopCategories,
  IShopCategoryBesideProps,
} from "../../interfaces/Shop";

function ShopCategoryBeside(props: IShopCategoryBesideProps) {
  const {
    shopCategories,
    activeCategoryId,
    activeCategoryLevel,
    setCategoryId,
    setCategoryLevel,
    resetCategory,
    setIndexActiveTab,
    setIndexCategorySelect,
  } = props;

  const myConst = {
    indexUnset: -1,
    categoryIdUnset: 0,
    categoryLevelUnset: "0",
    indexTabAllProduct: 0,
    tabQuantityToBeDisplay: 4,
  };

  const isCategoryActive = (category: IFlatShopCategories) => {
    return (
      category.id === activeCategoryId && category.level === activeCategoryLevel
    );
  };

  const isAllProductsActive = () => {
    return (
      activeCategoryId === myConst.categoryIdUnset &&
      activeCategoryLevel.toString() === myConst.categoryLevelUnset
    );
  };

  const changeCategoryToAllProducts = () => {
    resetCategory();
    setIndexActiveTab(myConst.indexTabAllProduct);
    setIndexCategorySelect(myConst.indexUnset);
  };

  const changeCategory = (category: IFlatShopCategories, index: number) => {
    setCategoryId(category.id);
    setCategoryLevel(category.level.toString());
    let _index = index;
    if (index >= myConst.tabQuantityToBeDisplay) {
      _index = myConst.tabQuantityToBeDisplay;
    }
    setIndexActiveTab(_index + 1);
    setIndexCategorySelect(index);
  };

  return (
    <Box className="pt-3">
      <Box
        role="button"
        onClick={changeCategoryToAllProducts}
        color={isAllProductsActive() ? "primary" : ""}
        fontWeight={isAllProductsActive() ? "bold" : ""}
        className="py-2"
      >
        {isAllProductsActive() ? "> All Products" : "All Products"}
      </Box>
      {shopCategories.map((category, index) => (
        <Box
          role="button"
          key={index}
          onClick={() => changeCategory(category, index)}
          color={isCategoryActive(category) ? "primary" : ""}
          fontWeight={isCategoryActive(category) ? "bold" : ""}
          className="py-2"
        >
          {isCategoryActive(category) ? `> ${category.name}` : category.name}
        </Box>
      ))}
    </Box>
  );
}

export default ShopCategoryBeside;
