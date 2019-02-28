// @ts-check
import React from 'react';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { Link } from 'react-router-dom';
import Config from './config';

const NotFound = () => (
  <Row type="flex" justify="center" align="top" className="Layout marT20 text-center">
    <Col
      className="white"
      xs={Config.responsive.xs}
      sm={Config.responsive.sm}
      md={Config.responsive.md}
      lg={Config.responsive.lg}
    >
      <h1 className="text-center not-found">Dikkat!</h1>
      <div className="not-found-under-title">
        Yanlış bir sayfaya geldiniz. Lütfen aşşağıdaki ana sayfa butonuna tıklayınız.
        <div className="clearfix" />
        <Button type="primary" className="marT40">
          <Link to="/">Ana Sayfa</Link>
        </Button>
      </div>
    </Col>
  </Row>
);

export default NotFound;
