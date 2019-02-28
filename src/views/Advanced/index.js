import './index.css';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Spin from 'antd/lib/spin';
import { Content, DeviceSelect, BarCharts } from '../../components';
import i18n from '../../i18n';
import config from '../../config';
import RadioFilter from './RadioFilter';
import DateFilter from './DateFilter';
import { getGraphs } from '../../actions';

class Advance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: null,
      address: null,
      end_date: moment(new Date()).format('YYYY-MM-DD'),
      selectedDay: null,
      interval: 'daily',
    };

    this.selectStartDate = this.selectStartDate.bind(this);
    this.selectEndDate = this.selectEndDate.bind(this);
    this.selectInterval = this.selectInterval.bind(this);
  }

  componentDidMount() {
    if (this.props.active_device.device_id != undefined) {
      this.Graphs(this.props.active_device.device_id, this.state);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active_device.device_id !== this.props.active_device.device_id) {
      this.Graphs(nextProps.active_device.device_id, this.state);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.interval !== this.state.interval) {
      this.Graphs(nextProps.active_device.device_id, nextState);
    }

    if (nextState.start_date !== this.state.start_date) {
      this.Graphs(nextProps.active_device.device_id, nextState);
    }

    if (nextState.end_date !== this.state.end_date) {
      this.Graphs(nextProps.active_device.device_id, nextState);
    }
  }

  Graphs(id, state) {
    this.props.getGraphs(id, state);
  }

  ConsumptionConvertert(data) {
    const arr = [];
    data.forEach(res => {
      const obj = {};
      obj.current_reading = res.current_reading;
      obj.backflow = res.backflow;
      obj.name = res.name;
      obj.generated = res.generated;
      obj[i18n.t('consumption')] = res.consumption;
      arr.push(obj);
    });
    return arr;
  }

  DynamicAvg(data) {
    const new_data = [];
    let total = 0;
    const count = data.length;
    data.forEach(res => {
      total += res[i18n.t('consumption')];
    });
    const last_value = total / count;
    data.forEach(res => {
      const obj = res;
      obj[i18n.t('average')] = JSON.parse(last_value.toFixed(3));
      new_data.push(obj);
    });
    return new_data;
  }

  selectStartDate(e) {
    this.setState({ start_date: e != null ? moment(e).format('YYYY-MM-DD') : null });
  }

  selectEndDate(e) {
    this.setState({ end_date: moment(e).format('YYYY-MM-DD') });
  }

  selectInterval(e) {
    this.setState({ interval: e.target.value });
  }

  render() {
    const { devices, graphs } = this.props;
    const GraphData = this.DynamicAvg(this.ConsumptionConvertert(graphs.data));
    const lineChartData = {
      value: GraphData,
      height: 300,
      color: '#ea6053',
    };
    return (
      <Content>
        <Spin spinning={graphs.loading}>
          <h1 className="pull-left marT5">{i18n.t('advanced')}</h1>
          <div className="pull-right marL5">{devices.length > 1 ? <DeviceSelect /> : null}</div>
          <DateFilter selectStartDate={this.selectStartDate} selectEndDate={this.selectEndDate} />
          <RadioFilter interval={this.state.interval} selectInterval={this.selectInterval} />
          <div className="clearfix" />
          <div className="ant-card">
            <div className="ant-card-head">
              <h3 className="marT15">
                {i18n.t('consumption_evolution')}({config.unit})
              </h3>
            </div>
            <div className="ant-card-body">
              <BarCharts {...lineChartData} />
              <ul className="un-style-list">
                <li>
                  <span className="color-box blue marR5" />
                  {i18n.t('average')}
                </li>
                <li>
                  <span className="color-box red marR5" />
                  {i18n.t('consumption')}
                </li>
                <li>
                  <span className="color-box generated marR5" />
                  {i18n.t('generated')}
                </li>
              </ul>
            </div>
          </div>
        </Spin>
      </Content>
    );
  }
}

Advance.defaultProps = {
  graphs: [],
};

const mapDispatchToProps = {
  getGraphs,
};

const mapStateToProps = state => ({
  devices: state.device.devices,
  active_device: state.device.active_device,
  router: state.router.location.pathname,
  graphs: state.graphs,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Advance),
);
