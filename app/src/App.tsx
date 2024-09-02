import './App.css'
import MultiStepForm from './components/MultiStepForm'
import { FormDataProvider } from './context/FormDataContext'

function App() {

  return (
    <main>
      <FormDataProvider>
          <MultiStepForm />
      </FormDataProvider>
    </main>
  )
}

export default App
