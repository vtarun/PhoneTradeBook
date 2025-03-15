export default function Dropdown({id, label, value, error, handleChange}){
    return <>
        <div className="mt-1 flex items-center justify-center font-medium flex-col">
                <label className ="" htmlFor={id}>{label}</label>
                <select 
                    id={id}
                    name={id}
                    value={value}
                    className="mt-1 min-w-96 rounded-md border-2 border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={handleChange}
                >
                    <option value="buy" defaultValue>Buy</option>
                    <option value="sell">Sell</option>
                </select>
        </div>
        {error && <p className="">{error}</p>}
    </>
}