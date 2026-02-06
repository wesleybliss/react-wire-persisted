import { useWireState, useWireValue } from '@forminator/react-wire'
import { useEffect, useState } from 'react'
import * as actions from '../actions'
import * as store from '../store'

import ListItem from './ListItem'

const PeopleList = () => {
    const [loading, setLoading] = useState(false)

    const people = useWireValue(store.people)
    const hasPeople = useWireValue(store.hasPeople)
    const [selectedPersonName, setSelectedPersonName] = useWireState(store.selectedPersonName)
    const hasCategories = useWireValue(store.hasCategories)
    const selectedCategory = useWireValue(store.selectedCategory)
    const selectedCategoryId = useWireValue(store.selectedCategoryId)

    /* istanbul ignore next */
    const handlePersonClick = (person) => {
        const fullName = `${person.firstName} ${person.lastName}`
        setSelectedPersonName(fullName)
    }

    // Fetch people when current category ID changes
    useEffect(() => {
        if (!selectedCategoryId || !hasCategories) return

        const fetchPeople = async () => {
            setLoading(true)
            await actions.fetchPeople(selectedCategoryId)
            setLoading(false)
        }

        fetchPeople()
    }, [selectedCategoryId, hasCategories])

    return (
        <div className="PeopleList h-full bg-slate-100">
            <header className="mb-4 p-4 flex flex-col">
                <span className="text-xl">PEOPLE</span>
                {selectedCategoryId && hasCategories ? (
                    <span className="text-sm">IN &quot;{selectedCategory?.name}&quot;</span>
                ) : (
                    <span className="text-sm">
                        <i>No category selected</i>
                    </span>
                )}
            </header>

            {loading && (
                <div className="p-4">
                    <i>Loading...</i>
                </div>
            )}

            {!loading && !hasPeople && (
                <div className="p-4">
                    <p>No people yet. Select a category!</p>
                </div>
            )}

            {!loading && hasPeople && (
                <ul data-testid="people-list">
                    {people.map((it, i) => {
                        const fullName = `${it.firstName} ${it.lastName}`
                        return (
                            <ListItem
                                key={`person-${i}`}
                                active={fullName === selectedPersonName}
                                onClick={
                                    /* istanbul ignore next */
                                    () => handlePersonClick(it)
                                }
                            >
                                {fullName}
                            </ListItem>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default PeopleList
