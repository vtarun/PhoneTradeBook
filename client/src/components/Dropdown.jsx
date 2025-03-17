export default function Dropdown({id, label, value, error, handleChange}){
    const selectClass = "mt-1 w-full rounded-md border-2 border-gray-400 py-1 px-3 shadow-sm bg-gray-400 text-black focus:border-yellow-400 focus:outline-none";
    return <>
        <div className="flex flex-col mt-4 w-full md:w-1/4">
                <label className ="flex justify-items-start text-sm font-medium text-white" htmlFor={id}>{label}</label>
                <select 
                    id={id}
                    name={id}
                    value={value}
                    className={selectClass}
                    onChange={handleChange}
                >
                    <option value="buy" defaultValue>Buy</option>
                    <option value="sell">Sell</option>
                </select>
        </div>
        {error && <p className="">{error}</p>}
    </>
}