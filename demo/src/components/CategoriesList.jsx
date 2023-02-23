import { useState, useEffect } from 'react'
import { useWireState, useWireValue } from '@forminator/react-wire'
import * as store from '../store'
import * as actions from '../actions'

import ListItem from './ListItem'

// Don't hold up tests unnecessarily
/* istanbul ignore next */
const simulatedTimeout = process.env.NODE_ENV === 'test' ? 0 : 800

const CategoriesList = () => {
    
    const [loading, setLoading] = useState(false)
    
    const categories = useWireValue(store.categories)
    const hasCategories = useWireValue(store.hasCategories)
    const [selectedCategoryId, setselectedCategoryId] = useWireState(store.selectedCategoryId)
    
    // Fetch categories onload
    useEffect(() => {
        
        const fetchCategories = async () => {
            setLoading(true)
            await actions.fetchCategories()
            setLoading(false)
        }
        
        setTimeout(fetchCategories, simulatedTimeout)
        
    }, [])
    
    return (
        
        <div className="CategoriesList h-full bg-slate-100">
            
            <header className="mb-4 p-4 text-xl">
                CATEGORIES
            </header>
            
            {loading && (
                <div className="p-4">
                    <i>Loading...</i>
                </div>
            )}
            
            {!loading && !hasCategories && (
                <div className="p-4">
                    <p>No categories yet.</p>
                </div>
            )}
            
            {!loading && hasCategories && (
                <ul data-testid="categories-list">
                    {categories.map((it, i) => (
                        <ListItem
                            key={`category-${i}`}
                            active={selectedCategoryId === it.id}
                            onClick={() => setselectedCategoryId(it.id)}>
                            {it.name}
                        </ListItem>
                    ))}
                </ul>
            )}
            
        </div>
        
    )
    
}

export default CategoriesList
