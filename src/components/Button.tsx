export const Button = () => {
    return (
        <a
            className="flex items-center justify-center border-2 border-black bg-white px-8 py-4 font-mono font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
            href="/profile"
        >
            Create New <span aria-hidden="true" className="ml-1.5" role="img">😎</span>
        </a>
    );
}

export default Button;