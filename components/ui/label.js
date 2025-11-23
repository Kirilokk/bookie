export default function Label({ children, htmlFor }) {
    return <label htmlFor={htmlFor} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        {children}
    </label>;
}