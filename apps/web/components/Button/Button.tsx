import { ReactNode } from "react";

import { JoinClassNames } from "../../utils";

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
    colour: Colour;
    size: Size;
    display: Display;
};

const SIZE_MAPS: Record<Size, string> = {
    [Size.SMALL]: "px-3 py-1 text-sm",
    [Size.MEDIUM]: "px-4 py-2 text-base",
    [Size.LARGE]: "px-4 py-2 text-2xl",
};

const COLOUR_MAPS: Record<Colour, string> = {
    [Colour.LIGHT]: "bg-gray-200 text-black",
    [Colour.DARK]: "bg-gray-700 text-white",
    [Colour.RED]: "bg-red-500 text-white",
    [Colour.YELLOW]: "bg-yellow-500 text-black",
    [Colour.GREEN]: "bg-green-500 text-white",
    [Colour.BLUE]: "bg-blue-500 text-white",
};

const DISPLAY_MAPS: Record<Display, string> = {
    [Display.INLINE]: "inline",
    [Display.BLOCK]: "text-center block w-full",
};

export function Button(props: Props) {
    const { children, className, colour, size, display } = props;

    return (
        <div
            className={JoinClassNames(
                "rounded-md mb-2 cursor-pointer",
                COLOUR_MAPS[colour],
                SIZE_MAPS[size],
                DISPLAY_MAPS[display],
                className
            )}
        >
            {children}
        </div>
    )

}

Button.defaultProps = {
    colour: Colour.LIGHT,
    size: Size.MEDIUM,
    display: Display.INLINE,
};

Button.colour = Colour;
Button.size = Size;
Button.display = Display;