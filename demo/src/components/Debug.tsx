import { useWireValue } from '@forminator/react-wire'
import * as actions from 'demo/src/actions'
import * as constants from 'demo/src/constants'
import * as store from 'demo/src/store'
import { useEffect } from 'react'
import * as rwp from '@/react-wire-persisted'
import * as rwpUtils from '@/utils'

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
        window.app = {
            store,
            actions,
            constants,
            rwp,
            rwpUtils,
        }
    })

    return (
        <div className="Debug mt-10 p-4 flex flex-col bg-gray-200 font-mono">
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            categories,
                            selectedCategory,
                            selectedCategoryId,
                            hasCategories,
                            people,
                            hasPeople,
                            selectedPersonName,
                        },
                        null,
                        4,
                    )}
                </code>
            </pre>
        </div>
    )
}

export default Debug
