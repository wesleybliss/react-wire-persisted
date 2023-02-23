
const TextInput = ({
    className,
    type,
    ...props
}) => {
    
    return (
        
        <input
            className={`
                TextInput
                px-4 py-3
                text-gray-800 bg-gray-100
                border border-gray-700
                focus:text-black focus:bg-white focus:border-gray-800
                outline-none focus:outline-none
                rounded
                ${className}
            `}
            type={type}
            {...props} />
        
    )
    
}

TextInput.defaultProps = {
    type: 'text',
}

export default TextInput
