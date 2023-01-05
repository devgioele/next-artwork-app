import clsx from 'clsx';

export default function OptionalImage({
  src,
  unavailable,
  classNameImg,
  classNameUnavailable,
}: {
  src: string | undefined | null;
  unavailable?: string;
  classNameImg?: string;
  classNameUnavailable?: string;
}) {
  return src ? (
    <img
      alt=''
      className={clsx('w-full group-hover:blur-sm', classNameImg)}
      src={src}
    />
  ) : (
    <div
      className={clsx(
        'flex aspect-square w-full flex-col items-center justify-center bg-orange-100 p-4 text-lg text-slate-800 group-hover:blur-sm',
        classNameUnavailable
      )}
    >
      {unavailable}
    </div>
  );
}
