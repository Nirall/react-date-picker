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

  const activeItem = useMemo(() => items.find(item => item.active) || items[0], [items]);

  return (
    <div className={b({ open: isOpen })} ref={ref}>
      <div className={b('current')} onClick={() => setIsOpen(ps => !ps)}>
        {activeItem.name}
        <img
          className={b('current-arrow')}
          src={arrowSVG}
          alt=""
        />
        {/* <SVG className={b('current-arrow')} svgProps={{ svg: arrowSVG }} />         */}
      </div>
      <ul className={b('items')} ref={listRef} /* onMouseLeave={() => changeOpen(false)} */>{itemsList}</ul>
    </div>
  );
};

export default Selector;
