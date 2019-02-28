import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Icon from 'antd/lib/icon';
import Switch from 'antd/lib/switch';
import Popconfirm from 'antd/lib/popconfirm';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';

import config from '../../config';
import i18n from '../../i18n';

const ButtonGroup = Button.Group;
const rulesMapping = {
  0: 'last_48_hour',
  1: 'nightly_consumption_date',
  2: 'daily_weekly_monthly_consumption',
  3: 'timespan_consumption',
};

const Table = ({ notifications, setActive, editModal, cancel, deleteNotif }) => (
  <div className="table-wrapper">
    {notifications.length > 0 ? (
      <table className="table-data">
        <tbody>
          <tr>
            <td>
              <strong>{i18n.t('notification_type')}</strong>
            </td>
            <td className="responsive-hide">
              <strong>{i18n.t('notification_channel')}</strong>
            </td>
            <td>
              <strong>{i18n.t('created_at')}</strong>
            </td>
            <td>
              <strong>{i18n.t('is_active')}</strong>
            </td>
            <td />
          </tr>
          {notifications.map(res => (
            <tr key={res.id}>
              <td>{i18n.t(rulesMapping[res.rule_type])}</td>
              <td className="responsive-hide">
                {res.channel_type === 0 ? (
                  <div>
                    <Icon className="marR5" type="mail" />
                    {i18n.t('email')}
                  </div>
                ) : null}
                {res.channel_type === 1 ? (
                  <div>
                    <Icon className="marR5" type="message" />
                    {i18n.t('sms')}
                  </div>
                ) : null}
                {res.channel_type === 4 ? (
                  <div>
                    <Icon className="marR5" type="bell" />
                    {i18n.t('push_notification')}
                  </div>
                ) : null}
              </td>
              <td>{moment(res.created_at).format(config.dateFormat)}</td>
              <td>
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="cross" />}
                  checked={res.is_active}
                  onChange={() => setActive(res)}
                />
              </td>
              <td>
                <ButtonGroup className="padR5">
                  <Popconfirm
                    title={i18n.t('are_you_sure_delete_notification_rule')}
                    onConfirm={() => deleteNotif(res)}
                    onCancel={cancel}
                    okText={i18n.t('delete')}
                    cancelText={i18n.t('cancel')}
                  >
                    <Button
                      size="small"
                      shape="circle"
                      icon="close-circle-o"
                      style={{ paddingRight: 0 }}
                    />
                  </Popconfirm>
                  <Button
                    size="small"
                    shape="circle"
                    style={{ paddingLeft: 0 }}
                    onClick={() => editModal(res)}
                    icon="edit"
                  />
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <Alert
        description={i18n.t('you_dont_have_a_notification')}
        message={i18n.t('notification_rules')}
      />
    )}
  </div>
);

Table.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActive: PropTypes.func.isRequired,
  deleteNotif: PropTypes.func.isRequired,
  editModal: PropTypes.func.isRequired,
};

export default Table;
