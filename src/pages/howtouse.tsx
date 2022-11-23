import Button from "../components/Button";

export const HowToUse = () => {
    return (
        <div className="w-full h-screen px-4 py-24 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">How to use</h1>

            <p>Do you want to create new card ? Click below button and create new 😎</p>
            <div className="flex flex-wrap justify-center gap-4">
				<Button />
			</div>
        </div>

    );
}

export default HowToUse;