import CategoriesList from './CategoriesList'
import Debug from './Debug'
import DemoActions from './DemoActions'
import PeopleList from './PeopleList'
import PersistedItemsList from './PersistedItemsList'

const App = () => {
    return (
        <div className="App w-full h-screen overflow-y-auto flex flex-col">
            <header className="App-header w-full p-8 text-2xl">React Wire Persisted (Demo)</header>

            <aside className="px-8 pt-3">
                <p>
                    The store has two items (<code>selectedCategoryId</code> &amp; <code>selectedPersonName</code>) that
                    are persisted wires (using <code>localStorage</code>).
                </p>
                <p>Click on a category and a person, then reload the page. The values should be persisted.</p>
            </aside>

            <section className="px-8 pt-3">
                <DemoActions />
            </section>

            <div className="grid grid-cols-3 gap-4 p-8">
                <PersistedItemsList />
                <CategoriesList />
                <PeopleList />
            </div>

            <Debug />
        </div>
    )
}

export default App
