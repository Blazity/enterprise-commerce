import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import { VariantProps } from 'class-variance-authority';

declare const button: (props?: ({
    intent?: "primary" | "secondary" | null | undefined;
    size?: "sm" | "lg" | null | undefined;
    underline?: boolean | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
    underline?: boolean;
    href: string;
}
declare function Button({ className, intent, size, underline, ...props }: ButtonProps): react_jsx_runtime.JSX.Element;

export { Button };
