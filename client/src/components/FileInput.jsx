export default function FileInput({ id, label, error, setPhoto }) {
    return <>
        <div className="flex flex-col w-full md:w-1/4 px-1 py-1">
            <label htmlFor={id} className=" rounded-md mt-2 py-1 text-sm font-medium text-white">
                {label}
            </label>
            
            <input
                type="file"
                id={id}
                name={id}
                accept="image/*"
                capture="environment"
                className="w-full rounded-md border-2 bg-gray-400 border-gray-400 h-9 py-1 px-3 shadow-sm text-sm"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            {error && <p className="mt-2 text-sm text-yellow-300">{error}</p>}
        </div>
    </>
}