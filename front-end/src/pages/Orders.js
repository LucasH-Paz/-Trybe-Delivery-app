import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getSales } from '../utils/Data';
import Header from '../Components/Header';
import dateFormatation from '../utils/Format';

function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const history = useHistory();

  const LINKS = [
    {
      name: 'PRODUTOS',
      url: '/customer/products',
      testId: 'customer_products__element-navbar-link-products',
    },
    {
      name: 'MEUS PEDIDOS',
      url: '/customer/orders',
      testId: 'customer_products__element-navbar-link-orders',
    },
  ];

  useEffect(() => {
    const teste = async () => {
      const token = localStorage.getItem('token');
      const result = await getSales(token);
      setOrders(result);
      setIsLoading(false);
    };
    teste();
  }, []);
  return (
    <div>
      <Header links={ LINKS } />
      {isLoading ? 'Loading' : orders.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `customer_orders__element-order-id-${item.id}` }
          onClick={ () => history.push(`/customer/orders/${item.id}`) }
        >
          <div>
            <h5>
              Pedido
            </h5>
            <h3
              data-testid={ `customer_products__element-order-date-${item.id}` }
            >
              { index + 1 }
            </h3>
          </div>
          <div
            className={ item.status }
            data-testid={ `customer_orders__element-delivery-status-${item.id}` }
          >
            { item.status }
          </div>
          <div>
            <h4
              data-testid={ `customer_orders__element-order-date-${item.id}` }
            >
              { dateFormatation(item.sale_date) }
            </h4>
            <h4
              data-testid={ `customer_orders__element-card-price-${item.id}` }
            >
              {`R$ ${item.totalPrice.replace('.', ',')}`}
            </h4>
          </div>
        </button>
      ))}
    </div>
  );
}

export default Orders;
