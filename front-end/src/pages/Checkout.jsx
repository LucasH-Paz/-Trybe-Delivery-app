import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Table from '../Components/Table';

const HEADERS = ['Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total'];

// Adaptar essas urls conforma a aplicação for implementada
const links = [
  { name: 'PRODUTOS', url: '/products' },
  { name: 'MEUS PEDIDOS', url: '/orders' },
];

// Helpers
const calculeSubTotalPrice = ({ quantity, price, name }) => ({
  name,
  quantity,
  price,
  total: quantity * price,
});

const calculeTotal = (cart) => cart.reduce((acc, cur) => {
  acc += cur.total;
  return acc;
}, 0);

const formatList = (cart) => cart.map((item) => calculeSubTotalPrice(item));

function Checkout() {
  const { cart, setCart } = useContext(UserContext);
  const CART_ITEMS = formatList(cart);

  const removeItem = (name) => {
    const newItems = cart.filter((item) => item.name !== name);
    setCart(newItems);
  };

  return (
    <>
      <Header links={ links } />
      <div>
        Finalizar Pedido
        <Table
          headers={ HEADERS }
          payload={ CART_ITEMS }
          hasButton
          onClick={ removeItem }
          testeId="element-order-table-name-"
        />
        <div>
          Total R$
          {' '}
          {
            calculeTotal(CART_ITEMS)
          }
        </div>
      </div>
      <form>
        <label htmlFor="seller">
          Vendedor Responsável
          <select id="seller">
            <option value="">Fulano</option>
          </select>
        </label>
        <label htmlFor="adress">
          Endereço
          <input type="text" required id="adress" />
        </label>
        <label htmlFor="number">
          Número
          <input type="number" required id="number" />
        </label>
      </form>
      <Link to="/">
        <button type="button">
          FINALIZAR PEDIDO
        </button>
      </Link>
    </>
  );
}

export default Checkout;
