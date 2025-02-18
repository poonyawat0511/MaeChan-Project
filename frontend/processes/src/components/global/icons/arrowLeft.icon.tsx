interface ArrowLeftIconProps {
  size?: number | string;
  fill?: string;
  className?:string;
}
export default function ArrowLeftIcon({
  size = 24,
  ...props
}: ArrowLeftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width={size}
      height={size}
      {...props}
      className={props.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
