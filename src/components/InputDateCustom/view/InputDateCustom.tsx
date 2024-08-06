import React from 'react';
import block from 'bem-cn';
import dayjs from 'dayjs';
import InputMask from 'react-input-mask';

import SVG from 'components/SVG';

import useClickOutside from '../model/useClickOutside';
import useInputDateCustom from '../model/useInputDateCustom';
import Selector from './Selector';

import calendarSVG from './img/calendar.svg';
import arrowSVG from './img/arrow.svg';
import arrowX2SVG from './img/arrowx2.svg';

import { IInputDateCustomProps } from './types';
import './InputDateCustom.scss';

const b = block('input-date-custom-mobile');

/**
 * @param { string } dateFormat - according to dayjs
*/

const InputDateCustom = ({
  dateFormat = 'DD.MM.YYYY HH:mm',
  value,
  onChange,
  color = 'default',
  position,
}: IInputDateCustomProps) => {
  const { handlers, values } = useInputDateCustom({ value, onChange, position });
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
      <div className={b('input')} onClick={() => handlers.setIsOpen(!values.isOpen)}>
        <SVG className={b('arrow')} svgProps={{ svg: calendarSVG }} />
        {dayjs(value).format(dateFormat)}
        <SVG className={b('arrow', { type: 'main' })} svgProps={{ svg: arrowSVG }} />
      </div>

      <div className={b('calendar-wrapper', { position: position ?? values.dynamicPosition })} ref={values.calendarRef}>
        <div className={b('calendar')}>
          <div className={b('calendar-header')}>
            <SVG
              className={b('arrow', { type: 'left' })}
              svgProps={{ svg: arrowSVG }}
              onClick={() => handlers.handleArrowClick(-1, 'year')}
            />
            <div className={b('selector')}>
              <Selector items={values.years} onChange={handlers.handleYearSelect} />
            </div>
            <SVG
              className={b('arrow', { type: 'right' })}
              svgProps={{ svg: arrowSVG }}
              onClick={() => handlers.handleArrowClick(1, 'year')}
            />
          </div>
          <div className={b('calendar-header')}>
            <SVG
              className={b('arrow', { type: 'left' })}
              svgProps={{ svg: arrowSVG }}
              onClick={() => handlers.handleArrowClick(-1, 'month')}
            />
            <div className={b('selector')}>
              <Selector items={values.months} onChange={handlers.handleMonthSelect} />
            </div>
            <SVG
              className={b('arrow', { type: 'right' })}
              svgProps={{ svg: arrowSVG }}
              onClick={() => handlers.handleArrowClick(1, 'month')}
            />
          </div>
          <div className={b('calendar-table')}>
            {weekItems}
            {daysItems}
          </div>
          {withTime && <div className={b('calendar-footer')}>
            <SVG
              className={b('arrow', { type: 'left' })}
              svgProps={{ svg: arrowX2SVG }}
              onClick={() => handlers.handleArrowClick(-1, 'hour')}
            />
            <SVG
              className={b('arrow', { type: 'left' })}
              svgProps={{ svg: arrowSVG }}
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
            <SVG
              className={b('arrow', { type: 'right' })}
              svgProps={{ svg: arrowSVG }}
              onClick={() => handlers.handleArrowClick(1, 'minute')}
            />
            <SVG
              className={b('arrow', { type: 'right' })}
              svgProps={{ svg: arrowX2SVG }}
              onClick={() => handlers.handleArrowClick(1, 'hour')}
            />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default InputDateCustom;
