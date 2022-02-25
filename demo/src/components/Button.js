
const Button = ({
    children,
    className,
    ...props
}) => {
    
    return (
        
        <button
            className={`
                Button px-4 py-3
                text-gray-800 bg-gray-100
                hover:text-black hover:bg-gray-300
                text-uppercase
                border border-gray-200
                outline:none focus:outline-none
                ${className || ''}
            `}
            {...props}>
            
            {children}
            
        </button>
        
    )
    
}

export default Button
