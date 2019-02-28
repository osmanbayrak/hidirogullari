import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import moment from 'moment';
import { CounterComponent, WaterMeter, WaterWave } from '../../components';
import config from '../../config';
import i18n from '../../i18n';

const HomeChart = ({ now_time, current_reading, average, current_percent, current }) => (
  <Row gutter={16} className="marT10">
    <Col span={8} xs={24} sm={24} md={12} lg={8} className="marB16">
      <div className="ant-card">
        <div className="ant-card-head">
          <h3 className="ant-card-head-title marT10 db">
            <span className="title pull-left">{i18n.t('current_reading')}</span>
            <span className="date">{moment(now_time).format('DD-MM-YYYY HH:MM')}</span>
          </h3>
        </div>
        <div className="ant-card-body">
          <WaterMeter loading={false} start={0} end={current_reading} />
        </div>
      </div>
    </Col>

    <Col span={8} xs={24} sm={24} md={12} lg={8} className="marB16">
      <div className="ant-card">
        <div className="ant-card-head">
          <h3 className="ant-card-head-title marT10 db">
            <span className="title">{i18n.t('montly_average')}</span>
          </h3>
        </div>
        <div className="ant-card-body">
          <CounterComponent unit={config.unit} loading={false} end={average} theme="blue" />
        </div>
      </div>
    </Col>

    <Col span={8} xs={24} sm={24} md={12} lg={8} className="marB16">
      <div className="ant-card">
        <div className="ant-card-head">
          <h3 className="ant-card-head-title marT10 db">
            <span className="title">{i18n.t('current_month_average')}</span>
          </h3>
        </div>
        <div className="ant-card-body">
          <div className="pr">
            {current_percent === 0 || !current_percent ? (
              <div className="currentWaterMeterCircle water_wave">
                <div className="water_wave__content">
                  <span className="water_wave__content--percent">0%</span>
                  <span className="water_wave__content--count">0.000 {config.unit}</span>
                </div>
              </div>
            ) : (
              <div>
                {current_percent && (
                  <WaterWave
                    percent={current_percent}
                    count={current.toFixed(3)}
                    unit={config.unit}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Col>
  </Row>
);

export default HomeChart;
