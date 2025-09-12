import * as React from 'react';
import { cn } from '@/shared/lib/css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
};

export const Input = ({ prefix, postfix, className, ...props }: InputProps) => {
  return (
    <label className="input">
      {prefix && prefix}
      <input className={cn(className)} {...props} />
      {postfix && postfix}
    </label>
  );
};
