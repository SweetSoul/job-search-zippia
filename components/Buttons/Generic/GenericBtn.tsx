interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
}

export default function GenericBtn({ children, color, ...rest }: IProps) {
  const wrapperStyles = [
    "relative",
    "before:w-full",
    "before:h-full",
    "before:absolute",
    "before:bottom-0",
    "before:left-0",
    "before:z-0",
    "before:rounded-xl",
    "before:transition-all",
    "before:duration-300",
    "before:ease-in-out",
    "before:bg-stone-800",
  ];
  const defaultStyles = [
    "flex",
    "gap-2",
    "items-center",
    "relative",
    "z-10",
    "rounded-xl",
    "px-5",
    "py-2",
    "font-bold",
    "transition-transform",
    "duration-300",
    "ease-in-out",
    "hover:-translate-y-1",
  ];

  const buttonBg = color ? color : "bg-violet-600 text-white";

  return (
    <div className={wrapperStyles.join(" ")}>
      <button className={`${defaultStyles.join(" ")} ${buttonBg}`} {...rest}>
        {children}
      </button>
    </div>
  );
}
