import { BigMapAbstraction, TezosToolkit, WalletContract } from "@taquito/taquito";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { TCard } from "../types/Card";
import { decodeStr, num2color } from "../utils/convert";

export const WalletAddress = () => {
    const contractAddress: string = process.env.REACT_APP_CONTRACT_ADDRESS ?? "";
    const deployNetwork: string = process.env.REACT_APP_DEPLOY_NETWORK ?? "";

    const [Tezos,] = useState<TezosToolkit>(
        new TezosToolkit(deployNetwork)
    );
    const { walletAddress } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [, setNotFound] = useState<boolean>(false);

    const [card, setCard] = useState<TCard>({
        name: "0xe5908de5898de69caae8a8ade5ae9a",
        color: 0,
        domain: "0xe68980e5b19ee69caae8a8ade5ae9a",
        email: "0xe383a1e383bce383abe382a2e38389e383ace382b9e69caae8a8ade5ae9a",
        handle_name: "0xe3838fe383b3e38389e383abe3838de383bce383a0e69caae8a8ade5ae9a",
        sns: {}
    });

    useEffect(() => {
        const exec = async () => {
            console.log("walletAddress :", walletAddress);
            const contract: WalletContract = await Tezos.wallet.at(contractAddress);
            const storage: BigMapAbstraction = await contract.storage();

            if (storage && walletAddress) {
                const cardData: any = await storage.get(walletAddress)
                    .catch(() => {
                        console.log("Not Found Card Data");
                        setNotFound(true);
                    });
                console.log("cardData :", cardData);

                if (cardData) {
                    setCard((prev) => {
                        return {
                            ...prev,
                            name: "0x" + cardData[0],
                            color: Number(cardData[1].c[0]),
                            domain: "0x" + cardData[2],
                            handle_name: "0x" + cardData[3],
                            email: "0x" + cardData[4],
                        }
                    });
                    setIsLoading(false);
                } else {
                    console.log("Not Found!");
                    setNotFound(true);
                }
            }
        }
        exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-white mx-auto max-w-xl text-center h-screen px-4 py-32 flex flex-col items-center justify-center font-mono">
            {
                isLoading ? (
                    <div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <Card name={decodeStr(card.name)} domain={decodeStr(card.domain)} email={decodeStr(card.email)} handle_name={decodeStr(card.handle_name)} color={num2color(card.color)} />
                )
            }
        </div>
    );
}

export default WalletAddress;
