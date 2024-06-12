import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ViewTripPage from "./pages/ViewTripPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trips/view/:id" element={<ViewTripPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
