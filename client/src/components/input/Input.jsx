export default function Input({ id, label, type = "text", value, error, handleChange }) {

    return <>
        <div className="flex flex-col mt-4">
            <label htmlFor={id} className="flex justify-items-start text-sm font-medium text-gray-900">
                {label}
            </label>
            <div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    className="mt-1 min-w-96 rounded-md border-2 border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={handleChange}
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
        </div>

    </>

}