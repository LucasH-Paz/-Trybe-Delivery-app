// Helpers
export const calculeSubTotal = ({ quantity, price, name }) => ({
  name,
  quantity,
  price,
  total: (quantity * Number(price)).toFixed(2),
});

export const calculeTotal = (cart) => cart.reduce((acc, cur) => {
  acc += Number(cur.total);
  return acc;
}, 0);

export const formatList = (cart) => cart.map((item) => calculeSubTotal(item));

export const createSalePayload = (userId, Sellers, cart) => {
  const deliveryAddress = document.querySelector('#adress').value;
  const deliveryNumber = document.querySelector('#number').value;
  // const seller = document.querySelector('#seller').value;
  const totalPrice = document.querySelector('#total').innerText;

  // const seller_id = Sellers.find(({ name }) => name === seller);

  return {
    deliveryAddress,
    deliveryNumber,
    sellerId: 2,
    userId,
    totalPrice: Number(totalPrice.replace(',', '.')),
    status: 'Pendente',
    orders: cart.map((item) => ({ ...item, productId: item.product })),
  };
};

export const createUserCart = (products, quantities) => (
  products.reduce((acc, cur) => (
    quantities[cur.id] > 0
      ? [...acc, { ...cur, quantity: quantities[cur.id].toFixed(2) }]
      : [...acc]
  ), [])
);
