import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
