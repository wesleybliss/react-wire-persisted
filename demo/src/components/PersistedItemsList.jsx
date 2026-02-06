import { useWireValue } from '@forminator/react-wire'
import * as store from '../store'

const PersistedItemsList = () => {
    const selectedCategory = useWireValue(store.selectedCategory)
    const selectedPersonName = useWireValue(store.selectedPersonName)

    return (
        <div className="PersistedItemsList h-full flex flex-col bg-slate-100">
            <header className="mb-4 p-4 flex flex-col">
                <span className="text-xl">PERSISTED ITEMS</span>
            </header>

            <div className="p-4 pb-2 flex">
                <span className="mr-2">Selected Person:</span>
                <span className="text-blue-500">{(selectedCategory && selectedPersonName) || 'Nobody'}</span>
            </div>

            <div className="p-4 pt-2 flex">
                <span className="mr-2">Selected Category:</span>
                <span className="text-blue-500">{selectedCategory?.name || 'None'}</span>
            </div>
        </div>
    )
}

export default PersistedItemsList
