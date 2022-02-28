import React from 'react'
import ReactDOM from 'react-dom'
import { NS } from './constants'
import * as reactPersistedWire from '../../src'
import App from './components/App'

import './index.css'

reactPersistedWire.setNamespace(NS)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
