import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import i18n from '../../i18n';

const Info = ({ evidence_consumption_place_id, meter_dev_id, address }) => (
  <Row gutter={16}>
    <Col span={8} xs={24} sm={24} md={12} lg={8}>
      <div className="meter-box">
        <span className="consumer-info" key="1">
          <span>{i18n.t('consumption_place')}</span>
          <p className="deviceInfoColor">{evidence_consumption_place_id}</p>
        </span>
      </div>
    </Col>

    <Col span={8} xs={24} sm={24} md={12} lg={8}>
      <div className="meter-box">
        <span className="consumer-info" key="2">
          <span>{i18n.t('water_meter_id')}</span>
          <p className="deviceInfoColor">{meter_dev_id}</p>
        </span>
      </div>
    </Col>

    <Col span={8} xs={24} sm={24} md={12} lg={8}>
      <div className="meter-box">
        <span className="consumer-info" key="1">
          <span>{i18n.t('address')}</span>
          <p className="deviceInfoColor">{address}</p>
        </span>
      </div>
    </Col>
  </Row>
);

export default Info;
