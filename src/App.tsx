import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/main" element={<Dashboard pageType="overview" />}></Route>
        <Route
          path="/userm"
          element={<Dashboard pageType="UserMgmt" />}
        ></Route>
      </Routes>
    </Router>
  );
}
export default App;
