import { InputHTMLAttributes } from 'react';
import { Class as ClassType } from '../types';
import './Class.css';

interface Props {
  active: boolean;
  event: ClassType;
}

export const Class: React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({
  event: { name, start, end },
  active,
  ...props
}) => {
  return (
    <div className={active ? 'Active Class' : 'Class'} {...props}>
      <h1>{name}</h1>
      <p>
        {start} - {end}
      </p>
    </div>
  );
};
