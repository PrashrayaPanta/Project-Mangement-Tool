import { BrowserRouter, Routes, Route } from "react-router-dom"
import Form from "./components/Form"
import ProjectsList from "./components/ProjectsList"



function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
            <Route path="/projects" element={<ProjectsList/>}/>
            <Route path="/projects/create" element={<Form/>}/>
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
