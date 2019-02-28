import './index.css';
import React from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';

const CounterComponent = ({ delay, end, unit }) => (
  <div className="conter__box blue">
    <CountUp
      id="conter"
      className="conter__box--counter colors"
      duration={delay}
      decimal="."
      decimals={3}
      useGrouping="true"
      separator=","
      start={0}
      end={end}
    />
    <span className="conter__box--high_pie_count pr unit">({unit})</span>
  </div>
);

CounterComponent.defaultProps = {
  delay: 2,
  end: 0,
  unit: 'm³',
};

CounterComponent.propTypes = {
  delay: PropTypes.number,
  end: PropTypes.number,
  unit: PropTypes.string,
};

export default CounterComponent;
