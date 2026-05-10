import { cn } from '@/utils';

type Props = {
  className?: string;
  src: string;
  alt?: string;
};

const Image = ({ className, src, alt }: Props) => {
  return (
    <figure className={cn('flex items-center justify-center overflow-hidden', className)}>
      <img src={src} alt={alt} className="h-auto w-full object-cover" />
    </figure>
  );
};

export default Image;
