export default function Button({ type, label }) {
    let className = type === 'submit' 
        ? "w-1/4 md:w-1/6 rounded-md bg-yellow-600 hover:bg-yellow-700 px-4 py-2 text-md font-semibold leading-6 text-black" 
        : "w-1/4 md:w-1/6 border-2 border-yellow-800 bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2 text-md font-semibold leading-6 text-gray-900";

    return (
        <button type={type} className={className}>
            {label}
        </button>
    );
}