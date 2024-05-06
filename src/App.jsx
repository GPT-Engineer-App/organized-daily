import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CompletedTodos from './pages/CompletedTodos.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/completed" element={<CompletedTodos />} />
      </Routes>
    </Router>
  );
}

export default App;
