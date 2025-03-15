export default function Button({type, label}){

    let className = type === 'submit' ? "rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-grey-900" : "text-sm font-semibold leading-6 text-grey-900";
    return <>
        <button type={type} className={className}>
            {label}
        </button>
    </>
}