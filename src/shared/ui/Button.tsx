import { cn } from "../lib/cn";

export const Button = (props) => {
  const { children, active, onClick } = props;

  return (
    <button
      className={cn(
        "px-3 py-2 rounded text-sm",
        "hover:bg-gray-200",
        active && "bg-blue-500 text-white"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
