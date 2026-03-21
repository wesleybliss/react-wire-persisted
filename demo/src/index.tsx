import App from 'demo/src/components/App'
import { NS } from 'demo/src/constants'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as reactPersistedWire from 'src'

import './index.css'

reactPersistedWire.setOptions({
    logging: {
        enabled: true,
    },
})

reactPersistedWire.setNamespace(NS)

// biome-ignore lint/style/noNonNullAssertion: root is never null
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)
