import { NS } from '../constants'
import { setNamespace } from '../../../src/react-wire-persisted'

import Debug from './Debug'
import DemoActions from './DemoActions'
import PersistedItemsList from './PersistedItemsList'
import CategoriesList from './CategoriesList'
import PeopleList from './PeopleList'

setNamespace(NS)

const App = () => {
    
    return (
        
        <div className="App w-full h-screen overflow-y-auto flex flex-col">
            
            <header className="App-header w-full p-8 text-2xl">
                {process.env.TITLE}
            </header>
            
            <aside className="px-8 pt-3">
                <p>
                    The store has two items (<code>selectedCategoryId</code> &amp; <code>selectedPersonName</code>)
                    that are persisted wires (using <code>localStorage</code>).
                </p>
                <p>
                    Click on a category and a person, then reload the page. The values should be persisted.
                </p>
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
