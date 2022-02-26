import { useEffect } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '../store'
import * as actions from '../actions'
import * as constants from '../constants'

const Debug = () => {
    
    const categories = useWireValue(store.categories)
    const selectedCategory = useWireValue(store.selectedCategory)
    const selectedCategoryId = useWireValue(store.selectedCategoryId)
    const hasCategories = useWireValue(store.hasCategories)
    const people = useWireValue(store.people)
    const hasPeople = useWireValue(store.hasPeople)
    const selectedPersonName = useWireValue(store.selectedPersonName)
    
    useEffect(() => {
        // Expose some things for easy debugging
        window.app = {}
        window.app.store = store
        window.app.actions = actions
        window.app.constants = constants
    })
    
    return (
        
        <div className="Debug mt-10 p-4 flex flex-col bg-gray-200 font-mono">
            
            <pre>
                <code>
                    {JSON.stringify({
                        categories,
                        selectedCategory,
                        selectedCategoryId,
                        hasCategories,
                        people,
                        hasPeople,
                        selectedPersonName,
                    }, null, 4)}
                </code>
            </pre>
            
        </div>
        
    )
    
}

export default Debug
