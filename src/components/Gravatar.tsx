import { Md5 } from "ts-md5";
interface gravatarProps {
    email: string,
    size: number
}
export const Gravatar: React.FC<gravatarProps> = (props: gravatarProps) => {
    const { email, size } = props;
    // calc md5
    const hash = Md5.hashStr(email, false)
    return (
        <img className="w-full" src={`https://www.gravatar.com/avatar/${hash}?s=${size}`} alt="profile" />
    )
}