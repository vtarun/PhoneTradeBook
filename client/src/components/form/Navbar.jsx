import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container flex justify-between items-center md:justify-around">
                <div className="text-white text-2xl font-bold">
                    <Link to="/">PhoneTradeBook</Link>
                </div>
                <div className="flex items-center">
                    <Link to="/search" className="text-md bg-white text-black px-2 py-1">Search</Link>
                </div>
            </div>
        </nav>
    );
}