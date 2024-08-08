import React from 'react';
import block from 'bem-cn';
import dayjs from 'dayjs';
import InputMask from 'react-input-mask';

import useClickOutside from '../model/useClickOutside';
import useDatePicker from '../model/useDatePicker';
import Selector from './Selector';

import calendarSVG from './img/calendar.svg';
import arrowSVG from './img/arrow.svg';
import arrowX2SVG from './img/arrowx2.svg';

import { IInputDateCustomProps } from './types';
import './DatePicker.scss';

const b = block('react-date-picker-dayjs');

/**
 * @param { string } dateFormat - according to dayjs
 * You can pass children as the base element of the date picker
*/

const DatePicker = ({
  dateFormat = 'DD.MM.YYYY HH:mm',
  value,
  onChange,
  color = 'default',
  position,
  children,
}: IInputDateCustomProps) => {
  const { handlers, values } = useDatePicker({ value, onChange, position });
  const { ref } = useClickOutside(() => handlers.setIsOpen(false));

  const weekItems = values.weekNames.map(v =>
    <div className={b('cell', { type: 'week' })} key={v}>{v}</div>
  );

  const daysItems = values.days.map((v, i) => (
    <div
      className={b('cell', { active: v.active })}
      key={`${v.name}_${i}`}
      onClick={() => handlers.handleDayClick(v)}
    >
      {v.name}
    </div>
  ));

  const withTime = dateFormat.toLowerCase().includes('hh');

  return (
    <div className={b({ color, open: values.isOpen })} ref={ref}>
      {children
        ? <div className={b('children')} onClick={() => handlers.setIsOpen(!values.isOpen)}>{children}</div>
        : <div className={b('input')} onClick={() => handlers.setIsOpen(!values.isOpen)}>
            <img className={b('arrow')} src={calendarSVG} alt="" />
            {value ? dayjs(value).format(dateFormat) : dateFormat}
            <img className={b('arrow', { type: 'main' })} src={arrowSVG} alt="" />
          </div>}

      <div className={b('calendar-wrapper', { position: position ?? values.dynamicPosition })} ref={values.calendarRef}>
        <div className={b('calendar')}>
          <div className={b('calendar-header')}>
            <img
              className={b('arrow', { type: 'left' })}
              src={arrowSVG}
              alt=""
              onClick={() => handlers.handleArrowClick(-1, 'year')}
            />
            <div className={b('selector')}>
              <Selector items={values.years} onChange={handlers.handleYearSelect} />
            </div>
            <img
              className={b('arrow', { type: 'right' })}
              src={arrowSVG}
              alt=""
              onClick={() => handlers.handleArrowClick(1, 'year')}
            />
          </div>
          <div className={b('calendar-header')}>
            <img
              className={b('arrow', { type: 'left' })}
              src={arrowSVG}
              alt=""
              onClick={() => handlers.handleArrowClick(-1, 'month')}
            />
            <div className={b('selector')}>
              <Selector items={values.months} onChange={handlers.handleMonthSelect} />
            </div>
            <img
              className={b('arrow', { type: 'right' })}
              src={arrowSVG}
              alt=""
              onClick={() => handlers.handleArrowClick(1, 'month')}
            />
          </div>
          <div className={b('calendar-table')}>
            {weekItems}
            {daysItems}
          </div>
          {withTime && <div className={b('calendar-footer')}>
            <img
              className={b('arrow', { type: 'left' })}
              src={arrowX2SVG}
              alt=""
              onClick={() => handlers.handleArrowClick(-1, 'hour')}
            />
            <img
              className={b('arrow', { type: 'left' })}
              src={arrowSVG}
              alt=""
              onClick={() => handlers.handleArrowClick(-1, 'minute')}
            />
            <InputMask
              mask="99:99"
              value={values.bufferValue.format('HH:mm')}
              onChange={handlers.handleTimeChange}
              maskChar={null}
            >
              {/* @ts-ignore */}
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => {
                return <input className={b('time')} type="text" inputMode='numeric' pattern='\d*' {...inputProps} />
              }}
            </InputMask>
            <img
              className={b('arrow', { type: 'right' })}
              src={arrowSVG}
              alt=""
              onClick={() => handlers.handleArrowClick(1, 'minute')}
            />
            <img
              className={b('arrow', { type: 'right' })}
              src={arrowX2SVG}
              alt=""
              onClick={() => handlers.handleArrowClick(1, 'hour')}
            />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
