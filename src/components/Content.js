import React from 'react';
import { Col, Row } from 'antd';
import Config from '../config';

const Content = ({ children }) => (
  <Row type="flex" justify="center" align="top" className="content">
    <Col
      xs={Config.responsive.xs}
      sm={Config.responsive.sm}
      md={Config.responsive.md}
      lg={Config.responsive.lg}
    >
      {children}
    </Col>
  </Row>
);

export default Content;
