import './index.css';
import React from 'react';
import { Link } from 'react-router-dom';
import Content from '../Content';
import Config from '../../config';
import logo from '../../assets/logos.png';

const FooterComponent = () => (
  <footer className="footer">
    <Content>
      <div className="logos">
        <span className="pull-right responsive-hide marT10">{Config.footerText}</span>
      </div>
    </Content>
  </footer>
);

export default FooterComponent;
