
const ListItem = ({
    children,
    active,
    ...props
}) => {
    
    return (
        
        <li
            className={`
                p-4 cursor-pointer hover:bg-slate-300
                ${active ? 'bg-slate-200' : ''}
            `}
            {...props}>
            
            {children}
            
        </li>
        
    )
    
}

export default ListItem
