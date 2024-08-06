import React from 'react';

export type IInputDateCustomProps = {
  color?: 'default';
  children?: React.ReactNode;
  dateFormat?: string;
  value: Date | null;
  onChange: (v: Date | null) => void;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}
