import React, { Dispatch, SetStateAction, useEffect } from "react";
import { BigMapAbstraction, TezosToolkit, WalletContract } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

interface connectProps {
    Tezos: TezosToolkit;
    setContract: Dispatch<SetStateAction<WalletContract | undefined>>;

    deployNetwork: string;
    contractAddress: string;

    wallet: BeaconWallet;
    setWallet: Dispatch<SetStateAction<any>>;

    setUserAddress: Dispatch<SetStateAction<string>>;
    setUserBalance: Dispatch<SetStateAction<number>>;

    setStorage: Dispatch<SetStateAction<BigMapAbstraction | undefined>>;
    setBeaconConnection: Dispatch<SetStateAction<boolean>>;
}

export const Connect: React.FC<connectProps> = (props: connectProps) => {
    const {
        Tezos, setContract, deployNetwork, contractAddress, wallet, setWallet,
        setUserAddress, setUserBalance, setStorage, setBeaconConnection
    } = props;

    const setup = async (userAddress: string): Promise<void> => {
        setUserAddress(userAddress);

        const balance = await Tezos.tz.getBalance(userAddress);
        setUserBalance(balance.toNumber());

        const contract: WalletContract = await Tezos.wallet.at(contractAddress);
        const storage: BigMapAbstraction = await contract.storage();
        console.log(contract);
        console.log(storage);
        setContract(contract);
        setStorage(storage);
    }

    const connectWallet = async (): Promise<void> => {
        try {
            console.log("Connect RPC :", deployNetwork);
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.GHOSTNET,
                    rpcUrl: deployNetwork
                }
            });

            const userAddress = await wallet.getPKH();
            console.log("Connect with :", userAddress);
            await setup(userAddress);
            setBeaconConnection(true);
        } catch (error) {
            console.error(error);
        }
    }

    const disconnectWallet = async (): Promise<void> => {
        console.log("Disconnecting...");
        await wallet.clearActiveAccount();
        console.log("Done.")
    }

    useEffect(() => {
        const exec = async () => {
            const wallet = new BeaconWallet({
                name: "Tezos Card",
                preferredNetwork: NetworkType.GHOSTNET,
            });
            Tezos.setWalletProvider(wallet);
            setWallet(wallet);

            const activeAccount = await wallet.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet.getPKH();
                console.log("Already connect with :", userAddress);
                await setup(userAddress);
                setBeaconConnection(true);
            }
        }
        exec();
    }, []);

    return (
        <div className="w-full">
            <button
                className="w-full flex items-center justify-center border-2 border-black bg-white px-8 py-4 font-mono font-bold
                        shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
                onClick={connectWallet} >
                Connect Wallet <span aria-hidden="true" className="ml-1.5" role="img">🔌</span>
            </button>
            {/* <button
                onClick={disconnectWallet}>
                Disconnect
            </button> */}
        </div>
    );
}

export default Connect;
