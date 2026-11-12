import { useEffect, useState } from 'react'
import { getTest } from './services/api'
import { useTranslation } from 'react-i18next'

import Button from '@mui/material/Button'

function App() {
  const [status, setStatus] = useState('Checking API...')
  const { t, i18n } = useTranslation()

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

      <h1>{t('dashboard')}</h1>

      <button onClick={() => i18n.changeLanguage('fi')}>FI</button>

      <button onClick={() => i18n.changeLanguage('en')}>EN</button>

      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
    </div>
  )
}

export default App
