import React from 'react';
import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

const Layout = props => (
  <div>
    <HeaderComponent />
    {props.children}
    <FooterComponent />
  </div>
);

export default Layout;
