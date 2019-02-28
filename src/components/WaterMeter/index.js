import './index.css';
import React from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';

const WaterMeter = ({ start, end }) => (
  <div className="water_meter pr">
    <CountUp
      duration={2}
      decimal="."
      decimals={3}
      useGrouping="true"
      separator=","
      className="water_meter--count"
      start={start}
      end={end}
    />
    <span className="water_meter--chart" />
  </div>
);

WaterMeter.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
};

WaterMeter.defaultProps = {
  start: 0,
  end: 0,
};

export default WaterMeter;
