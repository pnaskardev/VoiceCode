

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ResponseProvider } from './constants/responseContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResponseProvider>
      <App />
    </ResponseProvider>
  </React.StrictMode>,
)
