import './index.css';
// eslint-disable

import InputMask from 'react-input-mask';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Modal from 'antd/lib/modal';
import Spin from 'antd/lib/spin';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate } from 'react-day-picker/moment';
import {
  getNotification,
  nofiticationRules,
  updateNotification,
  deleteNotification,
  setNotification,
} from '../../actions';

import Config from '../../config';

import i18n from '../../i18n';
import Table from './Table';
import { DeviceSelect } from '../../components';
import Content from '../../components/Content';

const Options = Select.Option;
const FormItem = Form.Item;

class NotificationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      options: {
        start_date: new Date(),
        end_date: new Date(),
      },
      pagination: {
        page: 1,
        page_size: 20,
      },
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.setType = this.setType.bind(this);
    this.setChannelType = this.setChannelType.bind(this);
    this.editModal = this.editModal.bind(this);
    this.setActive = this.setActive.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.DeleteNotification = this.DeleteNotification.bind(this);
    this.CreateNotification = this.CreateNotification.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
  }

  componentDidMount() {
    if (this.props.active_device.device_id != undefined) {
      this.GetNotification(this.props.active_device.device_id, this.state.pagination);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active_device.device_id !== this.props.active_device.device_id) {
      this.GetNotification(nextProps.active_device.device_id, this.state.pagination);
      this.props.nofiticationRules(nextProps.active_device.device_id);
    }
  }

  GetNotification(id, options) {
    this.props.getNotification(id, options);
  }

  UpdateNotification(id, res) {
    this.props.updateNotification(this.props.active_device.device_id, id, res);
  }

  DeleteNotification(data) {
    this.props.deleteNotification(this.props.active_device.device_id, data.id);
  }

  setActive(res) {
    res.is_active = !res.is_active;
    this.UpdateNotification(res.id, res);
  }

  // Modal config
  setType(rule_type) {
    const new_date = new Date();
    this.setState({
      options: Object.assign({}, this.state.options, {
        start_date: moment(new_date).format('YYYY-MM-DD HH:mm'),
        end_date: moment(new_date).format('YYYY-MM-DD HH:mm'),
        rule_type,
        interval: '0',
      }),
    });
  }

  setChannelType(channel_type) {
    this.setState({
      options: Object.assign({}, this.state.options, {
        channel_type,
        email: this.props.users.email,
        phone_number: this.props.users.phone,
      }),
    });
  }

  setInterval(interval) {
    this.setState({ options: Object.assign({}, this.state.options, { interval }) });
  }

  selectDate(key, values) {
    this.setState({
      options: Object.assign({}, this.state.options, {
        start_date: moment(values[0]).format('YYYY-MM-DD HH:mm'),
        end_date: moment(values[1]).format('YYYY-MM-DD HH:mm'),
      }),
    });
  }

  showModal() {
    this.props.nofiticationRules(this.props.active_device.device_id);
    this.props.form.resetFields();
    this.setState({ options: {} });
    this.setState({ visible: !this.state.visible });
  }

  hideModal() {
    this.props.form.resetFields();
    this.setState({ options: {} });
    this.setState({ visible: false });
  }

  checkDot(event) {
    if (event.keyCode === 191) {
      event.preventDefault();
    }
  }

  CreateNotification(e) {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        this.state.options.threshold = parseFloat(`${this.state.options.thFirstPart}.${this.state.options.thSecondPart}`);
        if (this.state.options.id) {
          this.UpdateNotification(this.state.options.id, this.state.options);
        } else {
          this.state.options.phone_number = this.state.options.phone_number
            ? this.state.options.phone_number.replace(/[ ()]/g, '')
            : null;
          this.props.setNotification(
            this.props.active_device.device_id,
            Object.assign({}, this.state.options, { is_active: true }),
            () => {
              message.success(i18n.t('notification_rules_successfully_saved'));
              this.hideModal();
            },
            res => {
              message.error(res);
              return false;
            },
          );
        }
      }
    });
  }

  editModal(options) {
    this.showModal();
    this.setState({
      options: {
        start_date: options.start_date,
        end_date: options.end_date,
        thFirstPart: (options.threshold === 0 ? 0 : options.threshold.toString().split('.')[0]).toString(),
        thSecondPart: (options.threshold % 1 != 0 ? (options.threshold === 0 ? 0 : options.threshold.toString().split('.')[1]).toString() : 0).toString(),
        deviceID: options.device_id,
        id: options.id,
        created_at: options.created_at,
        is_active: options.is_active,
        interval: JSON.stringify(options.interval),
        rule_type: JSON.stringify(options.rule_type),
        channel_type: JSON.stringify(options.channel_type),
        email: options.email,
        phone_number: options.phone_number,
      },
    });
  }

  onPhoneChange(e) {
    this.setState({
      options: Object.assign({}, this.state.options, { phone_number: e.target.value }),
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { devices, notifications, rules } = this.props;
    const Language = localStorage.i18nextLng.split('-')[0];
    const mobileFormat = {
      tr: '+\\90 (999) 999 99 99',
      sk: '+421 (999) 999999',
      ro: '+40 (999) 999 999',
      cs: '+420 (999) 99 99 99',
      bg: '+35 9 (99) 999 999',
      en: '+99 (999) 999 99 99',
      pl: '+48 (999) 999 999',
    };
    const notificationOptions = {
      visible: this.state.visible,
      onCancel: this.hideModal,
      loader: false,
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 16 },
      },
    };
    const selectableDevice = {
      width: '100%',
    };

    const rules_mapping = {
      0: 'last_48_hour',
      1: 'nightly_consumption_date',
      2: 'daily_weekly_monthly_consumption',
      3: 'timespan_consumption',
    };
    const tableConfig = {
      cancel: this.hideModal,
      notifications: notifications.data,
      setActive: this.setActive,
      deleteNotif: this.DeleteNotification,
      editModal: this.editModal,
    };

    return (
      <Content>
        <h1 className="pull-left marT5">{i18n.t('notification_rules')}</h1>
        <div className="pull-right">
          {devices.length > 1 ? (
            <div className="pull-right marL5">
              <DeviceSelect />
            </div>
          ) : null}
          <Button type="primary" className="pull-right marT10 marL5" onClick={this.showModal}>
            <Icon className="marL5" type="plus" />
            {i18n.t('add_alarm')}
          </Button>
        </div>
        <div className="clearfix" />
        <Spin spinning={notifications.loading}>
          <Table {...tableConfig} />
        </Spin>
        <Modal
          wrapClassName="vertical-center-modal"
          {...notificationOptions}
          width="50%"
          title={i18n.t('add_notification_rule')}
          onOk={this.CreateNotification}
          okText={i18n.t('save')}
          cancelText={i18n.t('cancel')}
        >
          <Spin spinning={false}>
            <Form>
              {devices.length > 1 ? (
                <FormItem label={i18n.t('address')} {...formItemLayout} hasFeedback>
                  <DeviceSelect {...selectableDevice} />
                </FormItem>
              ) : null}
              <FormItem label={i18n.t('notification_type')} {...formItemLayout}>
                {getFieldDecorator('notification_type', {
                  initialValue: i18n.t(rules_mapping[this.state.options.rule_type]),
                  rules: [{ required: true, message: i18n.t('this_field_reqired') }],
                })(
                  <Select style={{ width: '100%' }} onChange={this.setType}>
                    {rules.map(res => (
                      <Options key={res} value={res}>
                        {i18n.t(rules_mapping[res])}
                      </Options>
                    ))}
                  </Select>,
                )}
              </FormItem>
              {/* Return notification type result */}
              {this.state.options.rule_type == 3 ? (
                <div>
                  <FormItem label={i18n.t('from_to_date')} {...formItemLayout}>
                    <div className="daypickerwidth">
                      <DayPickerInput
                        formatDate={formatDate}
                        format={Config.dateFormat}
                        value={moment(this.state.options.start_date).format(Config.dateFormat)}
                        placeholder={i18n.t('end_date')}
                        onDayChange={e => {
                          this.setState({
                            options: Object.assign({}, this.state.options, {
                              start_date: moment(e),
                            }),
                          });
                        }}
                        dayPickerProps={{
                          locale: localStorage.getItem('i18nextLng'),
                          localeUtils: MomentLocaleUtils,
                          todayButton: i18n.t('today'),
                          firstDayOfWeek: 1,
                        }}
                      />
                      <DayPickerInput
                        formatDate={formatDate}
                        format={Config.dateFormat}
                        value={moment(this.state.options.end_date).format(Config.dateFormat)}
                        placeholder={i18n.t('end_date')}
                        onDayChange={e => {
                          this.setState({
                            options: Object.assign({}, this.state.options, { end_date: moment(e) }),
                          });
                        }}
                        dayPickerProps={{
                          locale: localStorage.getItem('i18nextLng'),
                          localeUtils: MomentLocaleUtils,
                          todayButton: i18n.t('today'),
                          firstDayOfWeek: 1,
                        }}
                      />
                    </div>
                  </FormItem>
                  <FormItem label={i18n.t('threshold')} {...formItemLayout}>
                    <div className="daypickerwidth">
                      {getFieldDecorator('thFirstPart', {
                        initialValue: this.state.options.thFirstPart,
                        rules: [
                          {
                            required: true,
                            message: i18n.t('this_field_reqired'),
                            whitespace: true,
                          },
                        ],
                      })(
                        <Input
                          style={{ width: '25%' }}
                          onKeyDown={this.checkDot}
                          type="number"
                          onChange={e => {
                            this.setState({
                              options: Object.assign({}, this.state.options, {
                                thFirstPart: e.target.value,
                              }),
                            });
                          }}
                        />,
                      )} ,
                      {getFieldDecorator('thSecondPart', {
                        initialValue: this.state.options.thSecondPart,
                      })(
                        <Input
                          style={{ width: '25%', marginLeft: '10px' }}
                          onKeyDown={this.checkDot}
                          type="number"
                          onChange={e => {
                            this.setState({
                              options: Object.assign({}, this.state.options, {
                                thSecondPart: e.target.value,
                              }),
                            });
                          }}
                        />,
                      )}
                    </div>
                  </FormItem>
                </div>
              ) : null}

              {this.state.options.rule_type == 2 ? (
                <div>
                  <FormItem label={i18n.t('period')} {...formItemLayout} hasFeedback>
                    {getFieldDecorator('period', {
                      initialValue: this.state.options.interval,
                      rules: [
                        {
                          required: true,
                          message: i18n.t('this_field_reqired'),
                          whitespace: true,
                        },
                      ],
                    })(
                      <Select style={{ width: '100%' }} onChange={this.setInterval}>
                        <Options value="0">{i18n.t('daily')}</Options>
                        <Options value="1">{i18n.t('weekly')}</Options>
                        <Options value="2">{i18n.t('monthly')}</Options>
                      </Select>,
                    )}
                  </FormItem>
                  <FormItem label={i18n.t('threshold')} {...formItemLayout}>
                    <div className="daypickerwidth">
                      {getFieldDecorator('thFirstPart', {
                        initialValue: this.state.options.thFirstPart,
                        rules: [
                          {
                            required: true,
                            message: i18n.t('this_field_reqired'),
                            whitespace: true,
                          },
                        ],
                      })(
                      <Input
                        style={{ width: '25%' }}
                        onKeyDown={this.checkDot}
                        type="number"
                        onChange={e => {
                          this.setState({
                            options: Object.assign({}, this.state.options, {
                              thFirstPart: e.target.value,
                            }),
                          });
                        }}
                      />,
                      )} ,
                      {getFieldDecorator('thSecondPart', {
                        initialValue: this.state.options.thSecondPart,
                      })(
                      <Input
                        style={{ width: '25%', marginLeft: '10px' }}
                        onKeyDown={this.checkDot}
                        type="number"
                        onChange={e => {
                          this.setState({
                            options: Object.assign({}, this.state.options, {
                              thSecondPart: e.target.value,
                            }),
                          });
                        }}
                      />,
                      )}
                    </div>
                  </FormItem>
                </div>
              ) : null}
              <FormItem label={i18n.t('notification_channel')} {...formItemLayout} hasFeedback>
                {getFieldDecorator('notification_channel', {
                  initialValue: this.state.options.channel_type,
                  rules: [
                    {
                      required: true,
                      message: i18n.t('this_field_reqired'),
                      whitespace: true,
                    },
                  ],
                })(
                  <Select style={{ width: '100%' }} onChange={this.setChannelType}>
                    <Options value="0">
                      <Icon className="marR5" type="mail" />
                      {i18n.t('email')}
                    </Options>
                    <Options value="1">
                      <Icon className="marR5" type="message" />
                      {i18n.t('sms')}
                    </Options>
                    <Options value="4">
                      <Icon className="marR5" type="bell" />
                      {i18n.t('push_notification')}
                    </Options>
                  </Select>,
                )}
              </FormItem>
              {/* Return notification channel */}
              {this.state.options.channel_type == 0 ? (
                <FormItem {...formItemLayout} label={i18n.t('email')} hasFeedback>
                  {getFieldDecorator('email', {
                    initialValue: this.state.options.email,
                    rules: [
                      {
                        type: 'email',
                        message: i18n.t('not_valid_email'),
                      },
                      {
                        required: true,
                        message: i18n.t('this_field_reqired'),
                      },
                    ],
                  })(
                    <Input
                      onChange={v => {
                        this.setState({
                          options: Object.assign({}, this.state.options, {
                            email: v.target.value,
                          }),
                        });
                      }}
                    />,
                  )}
                </FormItem>
              ) : null}

              {this.state.options.channel_type == 1 ? (
                <FormItem {...formItemLayout} label={i18n.t('mobile')} hasFeedback>
                  {getFieldDecorator('mobile_phone', {
                    initialValue: this.state.options.phone_number,
                    rules: [
                      {
                        required: true,
                        message: i18n.t('this_field_reqired'),
                      },
                    ],
                  })(
                    <InputMask
                      className="ant-input"
                      mask={mobileFormat[Language]}
                      onChange={this.onPhoneChange}
                    />,
                  )}
                </FormItem>
              ) : null}
            </Form>
          </Spin>
        </Modal>
      </Content>
    );
  }
}

const Notification = Form.create()(NotificationPage);

Notification.defaultProps = {
  notifications: [],
  rules: [],
};

const mapDispatchToProps = {
  getNotification,
  nofiticationRules,
  updateNotification,
  deleteNotification,
  setNotification,
};

const mapStateToProps = state => ({
  devices: state.device.devices,
  active_device: state.device.active_device,
  notifications: state.notifications,
  rules: state.notifications.notifications_rules,
  users: state.users.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Notification),
);
