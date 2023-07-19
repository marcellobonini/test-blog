import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts/>} /> 
          <Route path="/posts/:id?" element={<Post/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
