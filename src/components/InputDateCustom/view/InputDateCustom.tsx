import React from 'react';
import block from 'bem-cn';

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

  return (
    <div className={b({ color })}>
      !!!TEST!!!
    </div>
  );
};

export default InputDateCustom;
