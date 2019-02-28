import React from 'react';
import Radio from 'antd/lib/radio';
import i18n from '../../i18n';

const RadioFilter = ({ selectInterval, interval }) => (
  <div className="pull-right marT10 marL10">
    <Radio.Group value={interval} className="marR5 marB5" onChange={selectInterval}>
      <Radio.Button value="daily">{i18n.t('day')}</Radio.Button>
      <Radio.Button value="weekly">{i18n.t('week')}</Radio.Button>
      <Radio.Button value="monthly">{i18n.t('month')}</Radio.Button>
    </Radio.Group>
  </div>
);

export default RadioFilter;
