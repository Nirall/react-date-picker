import React, { useEffect, useRef, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

import { getCalendarPosition, getYearsArr } from './data';

dayjs.extend(localeData);

type TUseInputDateCustom = {
  value: Date | null,
  onChange: (v: Date | null) => void,
  startYear?: number;
  yearsCount?: number;
  position?: string,
}

const useDatePicker = ({ value, onChange, position, startYear = 1900, yearsCount = 200 }: TUseInputDateCustom) => {
  const maxDate = useMemo(() => dayjs(`${startYear + yearsCount}-01-01T00:00:00`), [startYear, yearsCount]);
  const minDate = useMemo(() => dayjs(`${startYear - 1}-12-31T23:59:59`), [startYear]);
  const now = dayjs();
  const defaultValue = now.isBefore(maxDate) && now.isAfter(minDate) ? now : minDate.add(1, 'second');

  const [bufferValue, setBufferValue] = useState(value ? dayjs(value) : defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicPosition, setDynamicPosition] = useState('');
  const calendarRef = useRef<HTMLDivElement>(null);
  const isFirstRenderRef = useRef(true);

  useEffect(() => {
    if (value && (dayjs(value).toISOString() !== bufferValue.toISOString())) {
      setBufferValue(dayjs(value));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (!isOpen && !isFirstRenderRef.current) {
      const newDate = bufferValue.toISOString();
      if (newDate !== value?.toISOString()) {
        onChange(new Date(newDate));
      }
    }

    isFirstRenderRef.current = false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (calendarRef.current) {
      // change not through classes because if use classes there will be a blink when change position
      calendarRef.current.style.display = isOpen ? 'block' : 'none';

      if (!position) {
        const positionClass = getCalendarPosition(calendarRef.current);
        setDynamicPosition(positionClass);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const startDate = bufferValue
    .startOf('month')
    .startOf('week')
    .set('hour', bufferValue.get('hour'))
    .set('minute', bufferValue.get('minute'));
  const endDate = bufferValue.endOf('month').endOf('week');
  const daysCount = endDate.diff(startDate, 'day');
  const weekNames = dayjs.weekdaysMin();

  const days = new Array(daysCount + 1).fill(0).map((v, i) => {
    const day = startDate.add(i, 'day');
    const active = day.format('YYYY-MM-DD') === bufferValue.format('YYYY-MM-DD');
    const isAnotherMonth = day.format('MM') !== bufferValue.format('MM');

    return ({
      name: day.get('date'),
      value: day,
      active,
      isAnotherMonth,
    })
  });

  const months = dayjs.months().map((v, i) => ({
    value: i,
    name: v,
    active: bufferValue.get('month') === i,
  }));

  const years = getYearsArr({ startYear, yearsCount }).map(v => ({
    value: v,
    name: v,
    active: bufferValue.get('year') === v,
  }));

  const handleYearSelect = (item: typeof years[0]) => {
    setBufferValue(ps => ps.set('year', item.value));
  }

  const handleMonthSelect = (item: typeof months[0]) => {
    setBufferValue(ps => ps.set('month', item.value));
  }

  const handleDayClick = (v: typeof days[0]) => {
    if (v.value.isAfter(minDate) && v.value.isBefore(maxDate)) {
      setBufferValue(v.value);
      setIsOpen(false);
    }
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;

    if (/^\d+:\d+$/.test(v)) {
      const regResult = v.match(/^(\d+):(\d+)$/);
      const hours = Number(regResult?.[1]);
      const minutes = Number(regResult?.[2]);

      let newBufferValue = bufferValue;

      if (hours < 24 && hours >= 0) {
        newBufferValue = newBufferValue.set('hour', hours);
      }

      if (minutes < 60 && minutes >= 0) {
        newBufferValue = newBufferValue.set('minutes', minutes);
      }

      setBufferValue(newBufferValue);
    }
  };

  const handleArrowClick = (direction: 1 | -1, type: dayjs.ManipulateType) => {
    const newDate = bufferValue.add(direction, type);
    if (newDate.isAfter(minDate) && newDate.isBefore(maxDate)) {
      setBufferValue(newDate);
    }
  }

  return ({
    values: {
      years,
      months,
      weekNames,
      days,
      isOpen,
      bufferValue,
      calendarRef,
      dynamicPosition,
    },
    handlers: {
      handleYearSelect,
      handleMonthSelect,
      handleDayClick,
      handleTimeChange,
      handleArrowClick,
      setIsOpen,
      setBufferValue,
    }
  });
}

export default useDatePicker;