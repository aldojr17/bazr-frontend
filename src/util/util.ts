export const formatCurrency = (price: number) => {
  let formatter = new Intl.NumberFormat("id-ID");
  return formatter.format(price);
};

export function getPriceString(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
