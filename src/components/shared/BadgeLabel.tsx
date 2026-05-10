import { cn } from '@/utils';
import { Tag } from 'antd';
import type { ReactNode } from 'react';

type TBadge = {
  color: string;
  children: ReactNode;
  icon?: ReactNode;
  bordered?: boolean;

  className?: string;
};

const BadgeLabel = ({ bordered = true, className, ...props }: TBadge) => {
  return (
    <Tag
      bordered={bordered}
      className={cn('static !m-0 flex w-fit items-center gap-1', className)}
      color={props.color}
    >
      {props.icon}
      {props.children}
    </Tag>
  );
};

export default BadgeLabel;
