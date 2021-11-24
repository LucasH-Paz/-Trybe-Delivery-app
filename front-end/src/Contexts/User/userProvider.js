/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from './userContext';
import { validateToken } from '../../utils/Data';

function UserProvider({ children }) {
  const DEFAULT_USER = {
    id: 0,
    name: '',
    email: '',
    role: '',
    token: localStorage.getItem('token'),
  };

  const [user, setUser] = useState(DEFAULT_USER);
  const [cart, setCart] = useState([]);
  const history = useHistory();

  const context = {
    user,
    setUser,
    cart,
    setCart,
  };

  useEffect(() => {
    const validate = async () => {
      const url = window.location.href;
      const token = localStorage.getItem('token');
      if (token) {
        const data = await validateToken(token);
        if (data) {
          setUser(data);
          return history.push('/customer/products');
        }
      }
      return url.includes('/login') ? '' : history.push('/login');
      // if (token) {
      //   const data = await validateToken(token);
      //   console.log('DATA', data);
      //   if (data) {
      //     setUser(data);
      //     return history.push('customer/products');
      //   }
      //   if (!data && !(url.includes('/login'))) {
      //     history.push('/login');
      //   }
      //   return data ? setUser(data) : history.push('/login');
      // }
      // if (!(url.includes('/login')) && !token) {
      //   history.push('/login');
      // }
    };
    validate();
  }, []);

  return (
    <UserContext.Provider value={ context }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
