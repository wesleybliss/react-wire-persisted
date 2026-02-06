/* istanbul ignore file */

import { useWireState } from '@forminator/react-wire'
import { useEffect, useState } from 'react'
import { getStorage } from '../../../src/react-wire-persisted'
import * as store from '../store'

import Button from './Button'
import TextInput from './TextInput'

const DemoActions = () => {
    const [inputText, setInputText] = useState('')

    const [demoText, setDemoText] = useWireState(store.demoText)
    const [demoNumber, setDemoNumber] = useWireState(store.demoNumber)

    const handleLogAllClick = () => {
        console.log(getStorage().getAll())
    }

    const handleInputTextChange = (e) => {
        setInputText(e.target.value?.toString() || '')
    }

    const handleSaveDemoText = () => {
        setDemoText(inputText)
    }

    const handledemoNumberChange = (e) => {
        const parsed = parseInt(e.target.value, 10)
        if (parsed.toString() !== e.target.value) return
        setDemoNumber(parsed)
    }

    useEffect(() => setInputText(demoText), [demoText])

    return (
        <div className="p-4 flex justify-center items-center content-center">
            <div className="mx-2 p-2 bg-gray-200">
                <Button onClick={handleLogAllClick}>Log All Stored Items</Button>
            </div>

            <div className="mx-2 p-2 flex justify-center items-center content-center bg-gray-200">
                <TextInput
                    className="mr-2"
                    value={inputText}
                    placeholder="New namespace"
                    onChange={handleInputTextChange}
                />
                <Button onClick={handleSaveDemoText}>Change Demo Text</Button>
            </div>

            <div className="mx-2 p-2 flex justify-center items-center content-center bg-gray-200">
                <TextInput
                    className="mr-2"
                    type="number"
                    value={demoNumber?.toString() ?? ''}
                    placeholder="42 (auto saves)"
                    onChange={handledemoNumberChange}
                />
            </div>
        </div>
    )
}

export default DemoActions
