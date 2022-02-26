import { useState } from 'react'
import {
    getNamespace,
    getStorage,
    setNamespace,
} from '../../../src/react-wire-persisted'

import Button from './Button'
import TextInput from './TextInput'

const DemoActions = () => {
    
    const [inputNamespace, setInputNamespace] = useState('')
    
    const handleLogAllClick = () => {
        console.log(getStorage().getAll())
    }
    
    const handleNamespaceChange = e => {
        const value = (e.target.value || '')
            .replace(/\s/ig, '')
            .toLowerCase()
        setInputNamespace(value)
    }
    
    const handleMigrateNamespace = () => {
        const namespace = getNamespace()
        console.log('Change namespace from', namespace, 'to', inputNamespace)
        setNamespace(inputNamespace)
    }
    
    return (
        
        <div className="p-4 flex justify-center items-center content-center">
            
            <div className="mx-2 p-2 bg-gray-200">
                <Button onClick={handleLogAllClick}>
                    Log All Stored Items
                </Button>
            </div>
            
            <div className="mx-2 p-2 flex justify-center items-center content-center bg-gray-200">
                <TextInput
                    className="mr-2"
                    value={inputNamespace}
                    placeholder="New namespace"
                    onChange={handleNamespaceChange} />
                <Button onClick={handleMigrateNamespace}>
                    Change Namespace
                </Button>
            </div>
            
        </div>
        
    )
    
}

export default DemoActions
