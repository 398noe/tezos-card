import { BigMapAbstraction, TezosToolkit, WalletContract } from "@taquito/taquito";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Update from "../components/Update";
import Connect from "../components/Connect";
import { color2num, decodeStr, encodeStr, num2color } from "../utils/convert";
import { TCard } from "../types/Card";

export const Profile = () => {
    const contractAddress: string = process.env.REACT_APP_CONTRACT_ADDRESS ?? "";
    const deployNetwork: string = process.env.REACT_APP_DEPLOY_NETWORK ?? "";

    const [Tezos] = useState<TezosToolkit>(
        new TezosToolkit(deployNetwork)
    );
    const [contract, setContract] = useState<WalletContract | undefined>();
    const [wallet, setWallet] = useState<any>(null);
    const [userAddress, setUserAddress] = useState<string>("");
    const [, setUserBalance] = useState<number>(0);
    const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
    const [storage, setStorage] = useState<BigMapAbstraction | undefined>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [loadingCardStore, setLoadingCardStore] = useState<boolean>(false);

    const [colorString, setColorString] = useState<string>("#ffffff");

    const [card, setCard] = useState<TCard>({
        name: "0xe5908de5898de69caae8a8ade5ae9a",
        color: 16777215,
        domain: "0xe68980e5b19ee69caae8a8ade5ae9a",
        email: "0xe383a1e383bce383abe382a2e38389e383ace382b9e69caae8a8ade5ae9a",
        handle_name: "0xe3838fe383b3e38389e383abe3838de383bce383a0e69caae8a8ade5ae9a",
        sns: {}
    });

    useEffect(() => {
        console.log("userAddress", userAddress);
    }, [userAddress]);

    const updateData = async () => {
        if (storage) {
            setIsLoading(true);
            const cardData: any = await storage.get(userAddress)
                .catch((e) => {
                    // Walletが接続されてて自分のデータがない場合にはここのエラーが発生する
                    console.log("Not Found Card Data");
                    console.error(e);
                });
            if (cardData) {
                console.log("cardData :", cardData);
                // colorStringにも値を変換して格納
                const colorNum = Number(cardData[1].c[0]);
                const colorString = num2color(colorNum);
                setColorString(colorString);
                // 値をcardに格納
                setCard((prev) => {
                    return {
                        ...prev,
                        name: "0x" + cardData[0],
                        color: colorNum,
                        domain: "0x" + cardData[2],
                        handle_name: "0x" + cardData[3],
                        email: "0x" + cardData[4],
                        // sns
                    }
                });
            }
            setIsLoading(false);
        }
    }

    useEffect(() => {
        updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storage]);

    useEffect(() => {
        if (loadingCardStore === false) {
            updateData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingCardStore]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        let value: string | number = e.target.value;
        if (name === "name" || name === "domain" || name === "email" || name === "handle_name") {
            value = encodeStr(value);
        }
        if (name === "color") {
            value = color2num(value);
        }
        setCard((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // 色の値だけ内部に保存するタイプが異なるため中間的なデータを保存しておく
    const handleInputColorString = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColorString(e.target.value);
    }

    useEffect(() => {
        setCard((prev) => {
            return {
                ...prev,
                color: color2num(colorString)
            }
        });
    }, [colorString]);

    useEffect(() => {
        console.log(card);
    }, [card]);

    return (
        <div className="bg-white mx-auto min-h-screen px-4 py-32 flex flex-col items-center justify-center font-mono gap-y-4">
            <Connect
                Tezos={Tezos} setContract={setContract}
                deployNetwork={deployNetwork} contractAddress={contractAddress}
                wallet={wallet} setWallet={setWallet}
                setUserAddress={setUserAddress}
                setUserBalance={setUserBalance}
                setStorage={setStorage}
                setBeaconConnection={setBeaconConnection}
            />
            {
                beaconConnection ? (
                    <>
                        <div className="w-full p-4 gap-y-4 flex flex-col items-center justify-center">
                            {
                                (isLoading || loadingCardStore) ? (
                                    <p>
                                        {
                                            loadingCardStore ? "Saving..." : (
                                                isLoading ? "Loading..." : ""
                                            )
                                        }
                                    </p>
                                ) : (
                                    <>
                                        <p>Card Preview</p>
                                        <Card name={decodeStr(card.name)} domain={decodeStr(card.domain)} email={decodeStr(card.email)} handle_name={decodeStr(card.handle_name)} color={colorString} />
                                        <div className="p-4 flex flex-col gap-2">
                                            <div>
                                                <span className="w-20 inline-block">Name: </span>
                                                <input
                                                    className="border-2 border-black font-mono"
                                                    type="text" value={decodeStr(card.name)} name="name" onChange={handleInput}
                                                    maxLength={50}
                                                    required={true}
                                                />
                                            </div>
                                            <div>
                                                <span className="w-20 inline-block">Color: </span>
                                                <input
                                                    className="border-2 border-black font-mono"
                                                    type="text" value={colorString} name="color" onChange={handleInputColorString}
                                                    maxLength={7}
                                                    required={true}
                                                />
                                            </div>
                                            <div>
                                                <span className="w-20 inline-block">Domain: </span>
                                                <input
                                                    className="border-2 border-black font-mono"
                                                    type="text" value={decodeStr(card.domain)} name="domain" onChange={handleInput}
                                                    maxLength={50}
                                                    required={true}
                                                />
                                            </div>
                                            <div>
                                                <span className="w-20 inline-block">Email: </span>
                                                <input
                                                    className="border-2 border-black font-mono"
                                                    type="text" value={decodeStr(card.email)} name="email" onChange={handleInput}
                                                    maxLength={50}
                                                    required={true}
                                                />
                                            </div>
                                            <div>
                                                <span className="w-20 inline-block">Handle: </span>
                                                <input
                                                    className="border-2 border-black font-mono"
                                                    type="text" value={decodeStr(card.handle_name)} name="handle_name" onChange={handleInput}
                                                    maxLength={50}
                                                    required={true}
                                                />
                                            </div>
                                        </div>
                                        <Update
                                            deployNetwork={deployNetwork}
                                            contract={contract}
                                            card={card}
                                            loadingCardStore={loadingCardStore} setLoadingCardStore={setLoadingCardStore}
                                        />
                                        <a
                                            className="w-full flex items-center justify-center border-2 border-black bg-white px-8 py-4 font-mono font-bold shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
                                            href={userAddress}
                                            target={"_blank"}
                                            rel={"noreferrer"}
                                        >
                                            Share Link <span aria-hidden="true" className="ml-1.5" role="img">🔗</span>
                                        </a>

                                    </>

                                )
                            }
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    );
}

export default Profile;
