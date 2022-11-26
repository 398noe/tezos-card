interface buttonProps {
    link: string,
    message: string,
    icon: string,
    newPage?: boolean
}
export const Button: React.FC<buttonProps> = (props: buttonProps) => {
    const { link, message, icon, newPage } = props;

    return (
        <a
            className="flex items-center justify-center border-2 border-black bg-white px-8 py-4 font-mono font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
            href={link}
            target={newPage ? "_blank" : "_self"}
            rel={newPage ? "noreferrer" : ""}
        >
            {message} <span aria-hidden="true" className="ml-1.5" role="img">{icon}</span>
        </a>
    );
}

export default Button;