import { Gravatar } from "./Gravatar";

interface cardProps {
    name: string,
    domain: string,
    email: string,
    handle_name: string
}

export const Card: React.FC<cardProps> = (props: cardProps) => {
    const { name, domain, email } = props;
    return (
        <div className="w-full max-w-sm sm:max-w-lg min-h-60 px-4 py-0 border-2 border-solid border-black flex flex-col justify-center">
            <div className="flex justify-around flex-col sm:flex-row">
                <div className="px-2 py-4 flex items-center w-full sm:w-48">
                    <Gravatar email={email} size={512} />
                </div>
                <div className="flex flex-col font-mono px-2 py-4 justify-between max-w-96">
                    <div className="py-8 text-center">
                        <p className="text-3xl">{name}</p>
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <div>
                            <p className="inline-block pr-4 w-20">domain:</p>
                            <p className="inline">{domain}</p>
                        </div>
                        <div>
                            <p className="inline-block pr-4 w-20">email:</p>
                            <p className="inline">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;