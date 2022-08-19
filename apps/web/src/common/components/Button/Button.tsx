import { ReactNode } from "react";

import { JoinClassNames } from "../../utils/style";

enum Colour {
  LIGHT,
  DARK,
  RED,
  YELLOW,
  GREEN,
  BLUE,
}

enum Size {
  SMALL,
  MEDIUM,
  LARGE,
}

enum Display {
  INLINE,
  BLOCK,
}

type Props = {
  children?: ReactNode;
  className?: string;
  handleClick?: () => void;
  colour: Colour;
  size: Size;
  display: Display;
};

const SIZE_MAPS: Record<Size, string> = {
  [Size.SMALL]: "px-3 py-1 text-sm",
  [Size.MEDIUM]: "px-4 py-2 text-base",
  [Size.LARGE]: "px-4 py-2 text-lg",
};

const COLOUR_MAPS: Record<Colour, string> = {
  [Colour.LIGHT]:
    "bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-slate-100",
  [Colour.DARK]: "bg-slate-900 text-slate-100 hover:bg-slate-700",
  [Colour.RED]: "bg-red-500 text-white",
  [Colour.YELLOW]: "bg-yellow-500 text-black",
  [Colour.GREEN]: "bg-green-500 text-white",
  [Colour.BLUE]: "bg-blue-500 text-white",
};

const DISPLAY_MAPS: Record<Display, string> = {
  [Display.INLINE]: "inline",
  [Display.BLOCK]: "text-center block w-full",
};

export function Button({
  children,
  className,
  handleClick,
  colour,
  size,
  display,
}: Props) {
  return (
    <div
      className={JoinClassNames(
        "cursor-pointer rounded-md",
        COLOUR_MAPS[colour],
        SIZE_MAPS[size],
        DISPLAY_MAPS[display],
        className
      )}
      onClick={() => handleClick && handleClick()}
    >
      {children}
    </div>
  );
}

Button.defaultProps = {
  colour: Colour.LIGHT,
  size: Size.MEDIUM,
  display: Display.INLINE,
};

Button.colour = Colour;
Button.size = Size;
Button.display = Display;
