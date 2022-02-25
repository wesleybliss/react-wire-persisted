import { useEffect } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '../store'
import * as actions from '../actions'
import * as constants from '../constants'
import {
    getNamespace,
    getProvider,
    getStorage,
} from '../../../src/react-wire-persisted'

import Button from './Button'

const Debug = () => {
    
    const categories = useWireValue(store.categories)
    const selectedCategory = useWireValue(store.selectedCategory)
    const selectedCategoryId = useWireValue(store.selectedCategoryId)
    const hasCategories = useWireValue(store.hasCategories)
    const people = useWireValue(store.people)
    const hasPeople = useWireValue(store.hasPeople)
    const selectedPersonName = useWireValue(store.selectedPersonName)
    
    const handleLogAllClick = () => {
        getStorage().logAll()
    }
    
    useEffect(() => {
        window.app = {}
        window.app.store = store
        window.app.actions = actions
        window.app.constants = constants
    })
    
    return (
        
        <div className="Debug mt-10 p-4 flex flex-col bg-gray-200 font-mono">
            
            <div className="p-4">
                <Button onClick={handleLogAllClick}>
                    Log All Stored Items
                </Button>
            </div>
            
            <div>
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
            
        </div>
        
    )
    
}

export default Debug
