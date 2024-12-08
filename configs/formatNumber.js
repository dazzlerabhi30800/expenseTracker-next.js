export const formatPrice = (price) => {
  const priceFormat = new Intl.NumberFormat("en-IN").format(Number(price));
  return "₹" + priceFormat;
};

export const percentWidth = (totalAmount, totalSpent) => {
  return ((totalSpent / totalAmount) * 100).toFixed(2);
};
