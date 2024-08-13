/* eslint-disable max-len */
/* eslint-disable func-names */
import React, { useMemo, useState, useRef, useEffect } from 'react';
import block from 'bem-cn';

import useClickOutside from '../../model/useClickOutside';
import arrowSVG from '../img/arrow.svg';
import { TSelectorProps } from './types';
import './Selector.scss';

const b = block('react-date-picker-dayjs-selector');

const Selector = function <TValue = string>({
  items,
  onChange,
  style,
}: TSelectorProps<TValue>) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useClickOutside(() => setIsOpen(false));
  const listRef = useRef<HTMLUListElement>(null);

  const itemsList = useMemo(
    () =>
      items
        // .filter(item => !item.active)
        .map(item => (
          <li
            key={item.name}
            className={b('item', { active: item.active })}
            onClick={() => {
              onChange(item);
              setIsOpen(false);
            }}
          >
            {item.name}
          </li>
        )),
    [items, onChange],
  );

  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeIndex = items.findIndex(i => i.active);
      const scrollTop = ((activeIndex !== -1 ? activeIndex : 0) / items.length) * listRef.current.scrollHeight;

      listRef.current.scrollTo({
        top: scrollTop,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const main = ref.current;

    if (style && main) {
      Object.entries(style).forEach(([k, v]) => {
        main.style.setProperty(k, v);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [style]);

  const activeItem = useMemo(() => items.find(item => item.active) || items[0], [items]);

  return (
    <div className={b({ open: isOpen })} ref={ref}>
      <div className={b('current')} onClick={() => setIsOpen(ps => !ps)}>
        {activeItem.name}
        <div className={b('current-arrow')}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4679 18.2888L20.8073 13.1667C20.9358 13.0435 21 12.8938 21 12.7178C21 12.5418 20.9358 12.3922 20.8073 12.269L20.2018 11.6881C20.0734 11.5649 19.9174 11.5033 19.7339 11.5033C19.5505 11.4857 19.3945 11.5385 19.2661 11.6617L15 15.7541L10.7339 11.6617C10.6055 11.5385 10.4495 11.4857 10.2661 11.5033C10.0826 11.5033 9.92661 11.5649 9.79817 11.6881L9.19266 12.269C9.06422 12.3922 9 12.5418 9 12.7178C9 12.8938 9.06422 13.0435 9.19266 13.1667L14.5321 18.2888C14.6606 18.4296 14.8165 18.5 15 18.5C15.1835 18.5 15.3395 18.4296 15.4679 18.2888Z" fill="var(--text)"/>
          </svg>
        </div>
        {/* <SVG className={b('current-arrow')} svgProps={{ svg: arrowSVG }} />         */}
      </div>
      <ul className={b('items')} ref={listRef} /* onMouseLeave={() => changeOpen(false)} */>{itemsList}</ul>
    </div>
  );
};

export default Selector;
