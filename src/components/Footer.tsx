import { ReactComponent as GitHubIcon } from "../github.svg";
export const Footer = () => {
    return (
        <div className="flex w-full h-12 border-t-2 box-content bg-white border-black border-solid fixed bottom-0 z-40">
            <div className="flex-0">
            </div>
            <div className="flex-1 font-mono">
                <div className="flex justify-center items-center h-full text-sm">
                    <p>Tezos Card 2022 © All rights reseved.</p>
                </div>
            </div>
            <div className="flex-0 font-mono items-center mr-4">
                <a href="https://github.com/398noe/tezos-card" target="_blank" rel="noreferrer">
                    <GitHubIcon className="w-8 h-full inline" />
                </a>
            </div>
        </div>
    );
}

export default Footer;
