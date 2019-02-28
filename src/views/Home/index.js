import './index.css';

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Content } from '../../components';
import Info from './info';

class HomePage extends React.Component {
  componentDidMount() {
    if (this.props.active_device.device_id != undefined) {
      this.Summary(this.props.active_device.device_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active_device.device_id !== this.props.active_device.device_id) {
      this.Summary(nextProps.active_device.device_id);
    }
  }

  Summary(id) {
    this.props.getSummary(id);
  }

  render() {
    const { active_device } = this.props;
    return (
      <Content>
        <div className="clearfix" />
        <Info {...active_device} />
      </Content>
    );
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  devices: state.device.devices,
  deviceID: state.device.deviceID,
  active_device: state.device.active_device,
  summary: state.device.summary,
  router: state.router.location.key,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomePage),
);
