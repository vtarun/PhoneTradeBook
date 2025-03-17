import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 py-4 flex justify-center">
            <div className="w-full md:w-[80%] flex justify-between">
                <div className="text-yellow-400 text-2xl font-bold">
                    <Link to="/">PhoneTradeBook</Link>
                </div>
                <div className="flex items-center ">
                    <Link to="/search" className="text-md bg-yellow-400 text-black px-2 py-1">Find Customer</Link>
                </div>
            </div>
        </nav>
    );
}