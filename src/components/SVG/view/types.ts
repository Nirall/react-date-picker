import { HTMLAttributes } from 'react';
import { SVGInlineProps } from 'react-svg-inline';

interface ISVGProps extends HTMLAttributes<HTMLSpanElement> {
  svgProps: SVGInlineProps;
}

export type { ISVGProps };
