import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
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
