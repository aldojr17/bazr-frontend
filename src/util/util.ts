export const formatCurrency = (price: number) => {
  let formatter = new Intl.NumberFormat("id-ID");
  return formatter.format(price);
};

export const handleImageOnError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src =
    "https://res.cloudinary.com/dk3xvbob3/image/upload/v1669897898/post_images/vo16xijcmbztecqhwvuz.jpg";
};
