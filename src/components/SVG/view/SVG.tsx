/* eslint-disable react/react-in-jsx-scope */
import SVGInline from 'react-svg-inline';
import block from 'bem-cn';

import { ISVGProps } from './types';
import './SVG.scss';

const b = block('SVG-component');

const SVG = ({ svgProps, ...restProps }: ISVGProps) => {
  return (
    <span className={b()} {...restProps}>
      <SVGInline {...svgProps} className={b('content')} />
    </span>
  );
};

export default SVG;
