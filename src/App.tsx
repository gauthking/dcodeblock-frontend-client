import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { createContext, useState } from "react";

export const AppContext = createContext({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => {},
});

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route
            path="/main"
            element={<Dashboard pageType="overview" />}
          ></Route>
          <Route
            path="/userm"
            element={<Dashboard pageType="UserMgmt" />}
          ></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}
export default App;
