import Button from "../components/Button";

import switchProtocol from "../img/switchProtocol.png";
import connectWallet from "../img/connectWallet.jpg";
import customRPC from "../img/customRPC.jpg";
import confirmConnection from "../img/confirmConnection.jpg";
import yourProfile from "../img/yourProfile.png";
import saveProfile from "../img/saveProfile.png";

export const HowToUse = () => {
    return (
        <div className="w-full min-h-screen px-4 py-24 flex flex-col gap-4 break-all">
            <h1 className="text-4xl font-bold">How to use</h1>
            <p>If you want to create your card quickly, click <a href="#done" className="text-indigo-600 underline">this</a> and skip tutorial😎</p>

            <p>Before start to use, you may need tezos wallet address.</p>

            <h2 className="pt-4 text-4xl font-bold">Preparation</h2>
            <p>Install Temple Wallet for use wallet.</p>

            <div className="flex flex-wrap justify-center gap-4">
                <Button link="https://templewallet.com/download" message="Install Wallet" icon="✨" newPage />
            </div>

            <p>After install, you can setup temple wallet via application or extension guide.</p>

            <h3 className="pt-4 text-2xl font-bold">Switch Tezos Network</h3>
            <p>
                Tezos card is deployed on <a href="https://teztnets.xyz/ghostnet-about" className="text-indigo-600 underline" target={"_blank"} rel={"noreferrer"}>Ghostnet</a>.
                So if you want to use this service, you must get tezos at ghostnet.
            </p>
            <p>First, switch the network to Ghostnet Testnet.</p>
            <div className="flex w-full justify-center">
                <img src={switchProtocol} alt="Switch to Ghostnet" className="w-fit" />
            </div>
            <p>If you use Temple Wallet on mobile, Ghostnet Testnet may not be shown. But you can add RPC and set Ghostnet as default.</p>
            <p>Select "Settings" → "Default node (RPC) → "ADD CUSTOM RPC" ,then set name (any name is ok) and URL with <span className="font-bold break-all">"https://rpc.ghostnet.teztnets.xyz"</span></p>
            <div className="flex w-full justify-center">
                <img src={customRPC} alt="Add ghostnet" className="w-80" />
            </div>
            <p>Click "Add" to add custom RPC and select as Default node (RPC)</p>

            <h3 className="pt-4 text-2xl font-bold">Get Tezos with faucet</h3>
            <p>
                Next, you can get Tezos ghostnet faucet.<br />
                Access to <a href="https://faucet.ghostnet.teztnets.xyz/" className="text-indigo-600 underline break-all">https://faucet.ghostnet.teztnets.xyz</a>,
                and connect wallet.
            </p>
            <div className="flex w-full justify-center">
                <img src={connectWallet} alt="Connect to Wallet" className="w-fit" />
            </div>
            <p>
                When you connect your wallet, you can request Tezos with faucet. Press "Request 100 ꜩ" button and wait a few minutes. After wait a few minutes, Your wallet will be added 100 ꜩ.
            </p>

            <h2 className="pt-4 text-4xl font-bold">Start to use</h2>
            <p>It's very simple.</p>
            <p>First, connect your wallet with Tezos Card. Press Connect Wallet button, select your wallet and press Connect button to confirm connection.</p>
            <div className="flex w-full justify-center">
                <img src={confirmConnection} alt="Confirm Connection" className="w-fit" />
            </div>

            <p>For the first time, you can show your card with initial value after wallet connection.</p>
            <p>Enter your custom name, color, domain, email and handle.</p>
            <div className="flex w-full justify-center">
                <img src={yourProfile} alt="your Profile" className="w-fit" />
            </div>
            <p>After input your profiles, press "Save💾" button and save it on Tezos block chain.</p>
            <p>The popup window is appears, and confirm this operation.</p>
            <div className="flex w-full justify-center">
                <img src={saveProfile} alt="save Profile" className="w-fit" />
            </div>
            <p>After a few seconds, you can watch updated profile.</p>

            <h3 className="pt-4 text-2xl font-bold">Share Link</h3>
            <p>You can watch your profile card with "Share Link 🔗" button.</p>
            <p>Share the link to your profile card on SNS, generate a QR code and print it on your business card...feel free to use it✨</p>
            <h3 className="pt-4 text-2xl font-bold">Tips</h3>
            <p>
                Tezos card uses <a href="https://gravatar.com" className="text-indigo-600 underline" target={"_blank"} rel={"noreferrer"}>Gravatar</a> for profile icon.
                You can change by set on <a href="https://gravatar.com/emails" className="text-indigo-600 underline" target={"_blank"} rel={"noreferrer"}>Gravatar</a>.
            </p>

            <h3 className="pt-4 text-4xl font-bold" id="done">Done!</h3>
            <p>Do you want to create new card ? Click below button and create new 😎</p>
            <div className="flex flex-wrap justify-center gap-4">
                <Button link="/profile" message="Create New" icon="😎" />
            </div>
        </div>

    );
}

export default HowToUse;