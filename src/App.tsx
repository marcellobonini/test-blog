import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  /> 
          <Route path="/posts/:id?" /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
