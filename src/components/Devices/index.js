import React from 'react';
import { connect } from 'react-redux';
import Select from 'antd/lib/select';
import { setActiveDevice, getSummary, getGraphs } from '../../actions';

const Options = Select.Option;
class DeviceSelect extends React.Component {
  constructor(props) {
    super(props);
    this.selectDevice = this.selectDevice.bind(this);
  }

  selectDevice(e) {
    const device = this.props.devices.filter(res => res.device_id === e);
    this.props.setActiveDevice(device[0]);
  }

  render() {
    const { devices, active_device } = this.props;
    return (
      <Select
        value={active_device}
        className="marT10 pull-right"
        id="device"
        onChange={this.selectDevice}
        style={{ width: this.props.width }}
      >
        {devices.map(d => (
          <Options value={d.device_id} key={d.device_id}>
            {d.address}
          </Options>
        ))}
      </Select>
    );
  }
}

DeviceSelect.defaultProps = {
  width: 250,
};

const mapStateToProps = state => ({
  devices: state.device.devices,
  active_device: state.device.active_device ? state.device.active_device.device_id : null,
});

const mapDispatchToProps = {
  setActiveDevice,
  getSummary,
  getGraphs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceSelect);
