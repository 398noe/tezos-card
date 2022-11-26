import Button from "../components/Button";
import { ReactComponent as TezosIcon } from "../tezos.svg";

export const Home = () => {
	return (
		<div className="text-center w-full h-screen px-4 py-24 flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold sm:text-5xl">
				Create your profile card
				<span className="font-extrabold text-blue-500 pl-4">
					with<TezosIcon className="h-10 inline pl-2" />
				</span>
			</h1>

			<p className="mt-4 sm:text-xl sm:leading-relaxed">
				This service stores your data on tezos block chain as profile card.
			</p>

			<div className="mt-8 flex flex-wrap justify-center gap-4">
				<Button link="/profile" message="Create New" icon="😎" />
			</div>
		</div>
	);
}

export default Home;