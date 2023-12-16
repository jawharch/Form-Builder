
import './App.css'
import Dashboard from './components/Dashboard'
import Form from './components/Form'
import FormBuilder from './components/FormBuilder'
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  

  return (
    <div>
      <ChakraProvider/>
      <Dashboard/>

    </div>
  )
}

export default App
