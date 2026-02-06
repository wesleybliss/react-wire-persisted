import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as reactPersistedWire from '../../src'
import App from './components/App'
import { NS } from './constants'

import './index.css'

reactPersistedWire.setOptions({
    logging: true,
})

reactPersistedWire.setNamespace(NS)

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)
