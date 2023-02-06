export const formatCurrency = (price: number) => {
  let formatter = new Intl.NumberFormat("id-ID");
  return formatter.format(price);
};

export const formatTitle = (title: string) => {
  if (!title || title.length === 0) {
    return "BAZR";
  }

  const words = title.split(" ");

  const upperCased = words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");

  return upperCased + " | BAZR";
};

export const handleImageOnError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src =
    "https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png";
};

export const formatProductUrl = (title: string) => {
  return title
    .replace(/[^\w ]+/, " ")
    .split(" ")
    .join("-");
};
