export default function Button({ type, label }) {
    let className = type === 'submit' 
        ? "w-1/4 md:w-1/6 rounded-md px-4 py-1 text-md font-semibold leading-6 bg-yellow-600 hover:bg-yellow-700 text-black" 
        : "w-1/4 md:w-1/6 rounded-md px-4 py-1 text-md font-semibold leading-6 border-yellow-800 bg-gray-300 hover:bg-gray-400 text-gray-900";

    return (
        <button type={type} className={className}>
            {label}
        </button>
    );
}