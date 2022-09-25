import { ReactNode } from "react";

import { JoinClassNames } from "../../utils/style";

enum Variant {
  LIGHT,
}

enum Padding {
  SMALL,
  MEDIUM,
  LARGE,
}

type Props = {
  children?: ReactNode;
  className?: string;
  padding: Padding;
  variant: Variant;
};

const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.LIGHT]: "border-2 border-slate-200",
};

const PADDING_MAPS: Record<Padding, string> = {
  [Padding.SMALL]: "px-4 py-5",
  [Padding.MEDIUM]: "px-5 py-10",
  [Padding.LARGE]: "px-6 py-15",
};

export function Card(props: Props) {
  const { children, className, variant, padding } = props;

  return (
    <div
      className={JoinClassNames(
        "mb-5 w-full overflow-hidden rounded-lg text-center",
        VARIANT_MAPS[variant],
        PADDING_MAPS[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  variant: Variant.LIGHT,
  padding: Padding.MEDIUM,
};

Card.variant = Variant;
Card.padding = Padding;
