import {
  Box,
  Text,
  Flex,
  Heading,
  Button,
  Input,
  Textarea,
  VStack,
  InputGroup,
  InputLeftAddon,
  RadioGroup,
  Stack,
  Radio,
  Select,
  InputRightAddon,
  Image,
  Wrap,
  WrapItem,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../assets/icons";
import CreateProductVariationForm from "../../../components/Form/CreateProductVariationForm";
import FileInputBtn from "../../../components/Input/FileInputBtn";
import SelectCategoryModal from "../../../components/Modal/SelectCategoryModal";
import useCategory from "../../../hooks/useCategory";
import useShop from "../../../hooks/useShop";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import { IStateSelectedCategory } from "../../../interfaces/Components";
import {
  ICreateProductPhotoPayload,
  ICreateProductShopPayload,
  ICreateProductVTPayload,
} from "../../../interfaces/Product";
import { IProductUploadPhotoPayload } from "../../../interfaces/Shop";
import {
  ICreateVariantGroup,
  ICreateVariantType,
} from "../../../interfaces/Variant";
import routes from "../../../routes/Routes";
import "./style.css";

function AddProductForm() {
  const [imgList, setImgList] = useState<File[]>([]);
  const [selectedCat, setSelectedCat] = useState<IStateSelectedCategory>({
    primaryCat: undefined,
    secondaryCat: undefined,
    tertiaryCat: undefined,
  });
  const [variation, setVariation] = useState<boolean>(false);
  const [vgInput, setVgInput] = useState<ICreateVariantGroup[]>([]);
  const [vtList, setVtList] = useState<ICreateVariantType[]>([]);
  const [formInput, setFormInput] = useState({
    productName: "",
    productDescription: "",
    defaultPrice: "",
    defaultStock: "",
    weight: "",
    dangerousGoods: "false",
    condition: "New",
    SKU: "",
    minQty: "",
    maxQty: "",
  });
  const [disableBtn, setDisableBtn] = useState(false);

  const { categories } = useCategory();
  const { user } = useUser();
  const { uploadProductPhoto, createShopProduct } = useShop();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  useEffect(() => {}, [imgList, vtList, vgInput, formInput, selectedCat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput({
      ...formInput,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const submitForm = async () => {
    setDisableBtn(true);
    try {
      var productPayload: ICreateProductShopPayload = {
        name: "",
        description: "",
        primary_category_id: 0,
        secondary_category_id: 0,
        tertiary_category_id: 0,
        is_hazardous: false,
        weight: 0,
        internal_sku: "",
        condition: "",
        min_buy_qty: 0,
        shop_id: 0,
        photos: [],
        variant_group: {
          name: "",
          variant_type: [],
        },
      };

      if (!user?.shop_id) {
        throw new Error("Seller shop_id missing");
      }
      productPayload.shop_id = user?.shop_id;

      if (
        !selectedCat.primaryCat ||
        !selectedCat.secondaryCat ||
        !selectedCat.tertiaryCat
      ) {
        throw new Error("Please select a category");
      }

      productPayload.primary_category_id = selectedCat.primaryCat.id;
      productPayload.secondary_category_id = selectedCat.secondaryCat.id;
      productPayload.tertiary_category_id = selectedCat.tertiaryCat.id;

      if (imgList.length === 0) {
        throw new Error("Please upload at least one product image");
      }

      if (!variation) {
        if (
          Number(formInput.defaultPrice) <= 0 ||
          Number(formInput.defaultStock) <= 0
        ) {
          throw new Error("Missing fields price or stock for product");
        }

        productPayload.variant_group.name = "DEFAULT";

        const variantType: ICreateProductVTPayload = {
          name: "DEFAULT",
          stock: Number(formInput.defaultStock),
          price: Number(formInput.defaultPrice),
        };
        productPayload.variant_group.variant_type = [variantType];
      } else {
        if (vtList.length === 0) {
          throw new Error("Missing variant type");
        }

        if (vgInput[0].vg_name === "") {
          throw new Error("Variant 1 name must not be empty");
        }

        if (vgInput.length === 1) {
          productPayload.variant_group.name = vgInput[0].vg_name;

          vtList.forEach((row) => {
            if (row.vtOne_name === "") {
              throw new Error("Variant type must not be empty");
            }

            var vtPayload: ICreateProductVTPayload = {
              name: row.vtOne_name,
              price: Number(row.price),
              stock: Number(row.stock),
            };

            productPayload.variant_group.variant_type = [
              ...productPayload.variant_group.variant_type,
              vtPayload,
            ];
            return;
          });
        } else {
          if (vgInput[1].vg_name === "") {
            throw new Error("Variant 2 name must not be empty");
          }
          productPayload.variant_group.name =
            vgInput[0].vg_name + "," + vgInput[1].vg_name;

          vtList.forEach((row) => {
            if (row.vtOne_name === "" || row.vtTwo_name === "") {
              throw new Error("Variant type must not be empty");
            }

            var vtPayload: ICreateProductVTPayload = {
              name: row.vtOne_name + "," + row.vtTwo_name,
              price: Number(row.price),
              stock: Number(row.stock),
            };

            productPayload.variant_group.variant_type = [
              ...productPayload.variant_group.variant_type,
              vtPayload,
            ];
            return;
          });
        }
      }

      if (formInput.productName === "") {
        throw new Error("Missing field name");
      }
      productPayload.name = formInput.productName;

      if (formInput.productDescription === "") {
        throw new Error("Missing field description");
      }
      productPayload.description = formInput.productDescription;

      if (formInput.weight === "" || Number(formInput.weight) <= 0) {
        throw new Error("Missing or invalid weight field");
      }
      productPayload.weight = Number(formInput.weight);

      if (formInput.minQty === "" || Number(formInput.minQty) < 1) {
        throw new Error("Missing minimum qty, or must be greater than 0.");
      }
      productPayload.min_buy_qty = Number(formInput.minQty);

      if (formInput.maxQty !== "" && !(Number(formInput.maxQty) < 1)) {
        productPayload.max_buy_qty = Number(formInput.maxQty);
      }

      productPayload.condition = formInput.condition;
      productPayload.is_hazardous = JSON.parse(formInput.dangerousGoods);
      productPayload.internal_sku = formInput.SKU;

      const photoList: IProductUploadPhotoPayload = {
        photos: imgList,
      };

      const photoRes = await uploadProductPhoto(photoList);
      if (!photoRes.is_success) {
        throw new Error(photoRes.message);
      }

      photoRes.data.urls.forEach((cloudUrl) => {
        const cloudinaryUrl: ICreateProductPhotoPayload = {
          url: cloudUrl,
        };

        productPayload.photos = [...productPayload.photos, cloudinaryUrl];
        return;
      });

      const response = await createShopProduct(productPayload);
      if (!response.is_success) {
        throw new Error(response.message);
      }

      successToast("Product successfully created");
      setDisableBtn(false);
      navigate(routes.SELLER_PRODUCT);
    } catch (e: any) {
      errorToast(e.message);
      window.scrollTo(0, 0);
      setDisableBtn(false);
    }
  };

  return (
    <Box width="100%">
      <Flex flexDirection={"column"} p={8} backgroundColor={"whiteAlpha.800"}>
        <Heading mb={8} noOfLines={1}>
          Basic Information
        </Heading>
        <VStack justifyContent={"center"} alignItems={"center"} spacing={8}>
          <Flex flexDirection={"row"} width="70%">
            <Flex width="30%">
              <Text textColor={"tomato"}>*</Text>
              <Text>Product Images</Text>
            </Flex>
            <Wrap width="70%">
              {imgList.map((file, index) => {
                return (
                  <WrapItem key={index} className="imgContainer">
                    <Image
                      src={URL.createObjectURL(file)}
                      width="120px"
                      height="120px"
                    />
                    <IconButton
                      className="deleteImgBtn"
                      icon={<Icon.Trash />}
                      variant="solid"
                      colorScheme="orange"
                      aria-label={"Delete Image"}
                      onClick={() => {
                        setImgList(
                          imgList.filter((_, idx) => {
                            return idx !== index;
                          })
                        );
                      }}
                    />
                  </WrapItem>
                );
              })}
              <WrapItem>
                <FileInputBtn imgList={imgList} setImgList={setImgList} />
              </WrapItem>
            </Wrap>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Flex>
              <Text textColor={"tomato"}>*</Text>
              <Text>Product Name</Text>
            </Flex>
            <Input
              id="productName"
              placeholder="Enter product name"
              width={"70%"}
              value={formInput.productName}
              onChange={handleInputChange}
            />
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Flex>
              <Text textColor={"tomato"}>*</Text>
              <Text>Category</Text>
            </Flex>
            <Button width="70%" onClick={onOpen} justifyContent="space-between">
              <Text>
                {selectedCat.primaryCat?.name &&
                selectedCat.secondaryCat?.name &&
                selectedCat.tertiaryCat?.name
                  ? selectedCat.primaryCat.name +
                    " > " +
                    selectedCat.secondaryCat.name +
                    " > " +
                    selectedCat.tertiaryCat.name
                  : "Set Category"}
              </Text>
              <Icon.Pencil />
            </Button>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Flex>
              <Text textColor={"tomato"}>*</Text>
              <Text>Product Description</Text>
            </Flex>
            <Textarea
              id="productDescription"
              placeholder="Here is a sample placeholder"
              size="sm"
              resize={"vertical"}
              maxHeight="18rem"
              width={"70%"}
              value={formInput.productDescription}
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  productDescription: e.currentTarget.value,
                })
              }
            />
          </Flex>
        </VStack>
      </Flex>
      <Flex
        flexDirection={"column"}
        p={8}
        my={8}
        backgroundColor={"whiteAlpha.800"}
      >
        <Heading mb={8} noOfLines={1}>
          Sales Information
        </Heading>
        <VStack justifyContent={"center"} alignItems={"center"} spacing={8}>
          {!variation ? (
            <>
              <Flex
                flexDirection={"row"}
                justifyContent={"space-between"}
                width="70%"
              >
                <Text>Variations</Text>
                <Button
                  width="70%"
                  variant="outline"
                  onClick={() => setVariation(true)}
                >
                  + Enable Variations
                </Button>
              </Flex>
              <Flex
                flexDirection={"row"}
                justifyContent={"space-between"}
                width="70%"
              >
                <Flex>
                  <Text textColor={"tomato"}>*</Text>
                  <Text>Price</Text>
                </Flex>
                <InputGroup width="70%">
                  <InputLeftAddon children="Rp" />
                  <Input
                    id="defaultPrice"
                    min={0}
                    width="100%"
                    type="number"
                    placeholder="Input"
                    value={formInput.defaultPrice}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Flex>
              <Flex
                flexDirection={"row"}
                justifyContent={"space-between"}
                width="70%"
              >
                <Flex>
                  <Text textColor={"tomato"}>*</Text>
                  <Text>Stock</Text>
                </Flex>
                <Input
                  id="defaultStock"
                  min={0}
                  width="70%"
                  type="number"
                  placeholder="Input"
                  value={formInput.defaultStock}
                  onChange={handleInputChange}
                />
              </Flex>
            </>
          ) : (
            <CreateProductVariationForm
              setVariation={setVariation}
              vgInput={vgInput}
              setVgInput={setVgInput}
              vtList={vtList}
              setVtList={setVtList}
            />
          )}
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Flex>
              <Text textColor={"tomato"}>*</Text>
              <Text>Minimum Buy Qty</Text>
            </Flex>
            <Input
              id="minQty"
              width={"70%"}
              type="number"
              min={1}
              placeholder="Input"
              value={formInput.minQty}
              onChange={handleInputChange}
            />
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Flex>
              <Text>Maximum Buy Qty</Text>
            </Flex>
            <Input
              id="maxQty"
              width={"70%"}
              type="number"
              min={1}
              placeholder="Input"
              value={formInput.maxQty}
              onChange={handleInputChange}
            />
          </Flex>
        </VStack>
      </Flex>
      <Flex
        flexDirection={"column"}
        p={8}
        my={8}
        backgroundColor={"whiteAlpha.800"}
      >
        <Heading mb={8} noOfLines={1}>
          Shipping
        </Heading>
        <VStack justifyContent={"center"} alignItems={"center"} spacing={8}>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Flex>
              <Text textColor={"tomato"}>*</Text>
              <Text>Weight</Text>
            </Flex>
            <InputGroup width="70%">
              <Input
                id="weight"
                min={0}
                width="100%"
                placeholder="Input"
                type="number"
                value={formInput.weight}
                onChange={handleInputChange}
              />
              <InputRightAddon children="gr" />
            </InputGroup>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Text>Dangerous Goods</Text>
            <RadioGroup
              width="70%"
              value={formInput.dangerousGoods}
              onChange={(val) =>
                setFormInput({
                  ...formInput,
                  dangerousGoods: val,
                })
              }
            >
              <Stack direction="row" spacing={10} width="100%">
                <Radio value="false">No</Radio>
                <Radio value="true">
                  Contains battery, magnet, liquid, or flammable materials
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </VStack>
      </Flex>
      <Flex
        flexDirection={"column"}
        p={8}
        my={8}
        backgroundColor={"whiteAlpha.800"}
      >
        <Heading mb={8} noOfLines={1}>
          Others
        </Heading>
        <VStack justifyContent={"center"} alignItems={"center"} spacing={8}>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Text>Condition</Text>
            <Select
              width="70%"
              value={formInput.condition}
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  condition: e.currentTarget.value,
                })
              }
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </Select>
          </Flex>
          <Flex
            flexDirection={"row"}
            justifyContent={"space-between"}
            width="70%"
          >
            <Text>SKU</Text>
            <Input
              id="SKU"
              placeholder="Input"
              width={"70%"}
              value={formInput.SKU}
              onChange={handleInputChange}
            />
          </Flex>
        </VStack>
      </Flex>
      <Flex flexDirection={"row-reverse"} p={8} my={8} gap={4}>
        <Button
          width={"11em"}
          variant="solid"
          colorScheme={"green"}
          onClick={submitForm}
          disabled={disableBtn}
        >
          Save and Publish
        </Button>
        <Button
          width={"11em"}
          variant="outline"
          bgColor={"white"}
          onClick={() => navigate(routes.SELLER_PRODUCT)}
          disabled={disableBtn}
        >
          Cancel
        </Button>
      </Flex>
      <SelectCategoryModal
        isOpen={isOpen}
        onClose={onClose}
        categories={categories}
        selectedCategory={selectedCat}
        setSelectedCategory={setSelectedCat}
      />
    </Box>
  );
}

export default AddProductForm;
