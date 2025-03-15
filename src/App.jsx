import './App.css'
import { CaptchaBase } from './components/CaptchaBase'
import { ModalProvider } from './lib/Modal'

function App() {
  return (
    <ModalProvider>
      <CaptchaBase />
    </ModalProvider>
  )
}

export default App
