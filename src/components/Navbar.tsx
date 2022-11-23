import { ReactComponent as TezosIcon } from "../tezos.svg";
export const Navbar = () => {
    return (
        <div className="flex w-full h-14 border-b-2 box-content bg-white border-black border-solid fixed top-0 z-50 font-mono">
            <div className="flex-0">
                <a href="/" className="flex justify-center items-center h-full ml-4">
                    <TezosIcon className="h-full w-6 inline" />
                </a>
            </div>
            <div className="flex-1"></div>
            <div className="flex-0 font-mono">
                <div className="flex justify-center items-center h-full">
                    <a
                        className="flex items-center justify-center border-l-2 border-black bg-white px-8 py-4 font-mono font-bold transition hover:bg-black hover:text-white focus:outline-none focus:ring"
                        href="/howtouse"
                    >
                        How to Use <span aria-hidden="true" className="ml-1.5" role="img">👀</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;