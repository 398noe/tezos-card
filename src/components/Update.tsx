import { MichelsonMap, WalletContract } from "@taquito/taquito";
import React, { Dispatch, SetStateAction } from "react";
import { TCard } from "../types/Card";

interface updateProps {
    deployNetwork: string;
    contract: WalletContract | undefined;

    loadingCardStore: boolean;
    setLoadingCardStore: Dispatch<SetStateAction<boolean>>;

    card: TCard;
}

export const Update: React.FC<updateProps> = (props: updateProps) => {
    const {
        contract,
        card,
        loadingCardStore, setLoadingCardStore
    } = props;

    const storeCard = async (): Promise<void> => {
        setLoadingCardStore(true);
        // dataを分解
        const { color, domain, email, handle_name, name, sns } = card;
        try {
            if (contract) {
                // snsのKeyとValueをそれぞれ分解して展開する
                const snsMap = new MichelsonMap();
                for (const provider in sns) {
                    snsMap.set(provider, sns[provider]);
                }

                // check parameter
                const param = contract.methods.default(
                    // color, domain, handle_name, name, sns
                    color, domain, email, handle_name, name, snsMap
                ).toTransferParams();
                console.log(JSON.stringify(param, null, 4));

                // Make Operation
                const op = await contract.methods.default(
                    // color, domain, handle_name, name, sns
                    color, domain, email, handle_name, name, snsMap
                ).send();

                // check if operation is end
                console.log(`Waiting for ${op.opHash} to be confirmed...`);

                await op.confirmation(1)
                    .then(() => op.opHash)
                    .then((ophash) => {
                        console.log(`Operation injected: https://better-call.dev/ghostnet/opg/${ophash}/contents`)
                    }).catch((error) => {
                        console.error(`Error: ${JSON.stringify(error, null, 4)}`);
                    })
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingCardStore(false);
        }
    }

    return (
        <button
            className="w-full flex items-center justify-center border-2 border-black bg-white px-8 py-4 font-mono font-bold
                        shadow-[6px_6px_0_0_#000] transition hover:shadow-none focus:outline-none focus:ring"
            onClick={storeCard}
        >

            {
                loadingCardStore ? (
                    <span>Saving...</span>
                ) : (
                    <>
                        <span>Save</span>
                        <span aria-hidden="true" className="ml-1.5" role="img">💾</span>
                    </>
                )
            }
        </button>
    );
}

export default Update;