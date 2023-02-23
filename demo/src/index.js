import React from 'react'
import { NS } from './constants'
import * as reactPersistedWire from '../../src'
import App from './components/App'

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
