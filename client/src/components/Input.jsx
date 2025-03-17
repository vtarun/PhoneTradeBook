export default function Input({ id, label, type = "text", value, error, handleChange }) {
    const labelClass = "flex justify-items-start px-1 text-sm font-medium text-white";
    const inputClass = `mt-1 w-full h-9 flex flex-col rounded-md border-2 border-gray-400 py-1 px-3 shadow-sm bg-gray-400 text-black focus:border-yellow-400 focus:outline-none ${type === 'date' ? 'text-xs py-2 px-2' : ''}`;

    return (
        <div className="flex flex-col mt-4 w-full md:w-1/5">
            <label htmlFor={id} className={labelClass}>
                {label}
            </label>
            <div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    className={inputClass}
                    onChange={handleChange}
                />
                {error && <p className="mt-2 text-sm text-yellow-300">{error}</p>}
            </div>
        </div>
    );
}