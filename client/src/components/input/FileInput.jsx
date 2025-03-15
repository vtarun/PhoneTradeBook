export default function FileInput({ id, label, error, setPhoto }) {
    return <>
        <div>
            <label htmlFor={id} className=" rounded-md mt-2 py-1.5 text-sm font-medium text-grey-900">{label}</label>
            <input
                type="file"
                id={id}
                name={id}
                accept="image/*"
                capture="environment"
                className="min-w-96 mt-0 rounded-md border-b-2 border-t-2 border-x-2 border-y-2 py-1.5 text-gray-900 shadow-sm"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    </>
}