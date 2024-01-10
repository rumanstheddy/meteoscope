import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="forecast" element={<Forecast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
