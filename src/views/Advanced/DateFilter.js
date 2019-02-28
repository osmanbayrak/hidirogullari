import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate } from 'react-day-picker/moment';
import i18n from '../../i18n';

const DateFilter = ({ selectStartDate, selectEndDate }) => (
  <div className="pull-right marT10">
    <DayPickerInput
      formatDate={formatDate}
      format="DD-MM-YYYY"
      name="start_date"
      placeholder={i18n.t('start_date')}
      onDayChange={selectStartDate}
      dayPickerProps={{
        locale: localStorage.getItem('i18nextLng'),
        localeUtils: MomentLocaleUtils,
        todayButton: i18n.t('today'),
        firstDayOfWeek: 1,
        disabledDays: { after: new Date() },
      }}
    />
    <DayPickerInput
      formatDate={formatDate}
      format="DD-MM-YYYY"
      name="end_date"
      placeholder={i18n.t('end_date')}
      onDayChange={selectEndDate}
      dayPickerProps={{
        locale: localStorage.getItem('i18nextLng'),
        localeUtils: MomentLocaleUtils,
        todayButton: i18n.t('today'),
        firstDayOfWeek: 1,
        disabledDays: { after: new Date() },
      }}
    />
  </div>
);

export default DateFilter;
