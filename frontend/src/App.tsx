import { useEffect, useState } from 'react'
import { getTest } from './services/api'

import Button from '@mui/material/Button'

function App() {
  const [status, setStatus] = useState('Checking API...')

  useEffect(() => {
    getTest()
      .then((data) => {
        setStatus(data.status)
      })
      .catch(() => {
        setStatus('API connection failed')
      })
  }, [])

  return (
    <div>
      <h1>LenaLashes-workspace</h1>
      <Button variant="contained">MUI works</Button>
      <p>API status: {status}</p>
    </div>
  )
}

export default App
