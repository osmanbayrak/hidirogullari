import React from 'react';
import PropTypes from 'prop-types';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Cell,
  ResponsiveContainer,
  Line,
} from 'recharts';
import Spin from 'antd/lib/spin';
import i18n from '../../i18n';

const BarCharts = ({ height, value, color }) => (
  <Spin spinning={false}>
    <ResponsiveContainer>
      <ComposedChart
        className="LineChart"
        height={height}
        data={value}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey={i18n.t('consumption')} unit=" m³">
          {value.map((data, count) => (
            <Cell cursor="pointer" fill={data.generated === true ? '#ffc658' : color} key={count} />
          ))}
        </Bar>
        <Line type="monotone" dataKey={i18n.t('average')} stroke="#108ee9" strokeDasharray="2 2" />
      </ComposedChart>
    </ResponsiveContainer>
  </Spin>
);

BarCharts.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default BarCharts;
