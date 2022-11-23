import Button from "../components/Button";

interface notFoundProps {
    message?: string;
}

export const NotFound: React.FC<notFoundProps> = (props: notFoundProps) => {
    const { message } = props;
    return (
        <div className="h-screen px-4 py-32 flex flex-col items-center justify-center">
            <div className="text-center p-4 pb-8">
                <p className="text-6xl font-bold pb-2">404</p>
                <p>{message ?? "Your requested page is not exist..."}</p>
            </div>
            <Button />
        </div>
    );
}

export default NotFound;