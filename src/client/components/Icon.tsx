import Icons from "@app-assets/icons/sprites.svg";

export type IconProps = {
    iconCode: string;
    color?:
    | "color-svg-primary"
    | "color-svg-secondary"
    | "color-svg-success"
    | "color-svg-info"
    | "color-svg-warning"
    | "color-svg-danger"
    | "color-svg-dark"
    | "color-svg-light";
    size?: "svgicon-1" | "svgicon-2" | "svgicon-3" | "svgicon-4" | "svgicon-5" | "svgicon-full";
    onClick?: () => void;
    className?: string;
};

const Icon = (props: IconProps) => {
    const classNames = [props.color, props.className, props.size].filter(Boolean).join(" ");

    return (
        <svg onClick={props.onClick} className={"svgicon " + classNames}>
            <use xlinkHref={`${Icons}#${props.iconCode}`} />
        </svg>
    );
};

export default Icon;
