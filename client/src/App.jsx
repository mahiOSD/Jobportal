import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SearchJobs from "./pages/Searchjobs";
import JobDetails from "./pages/JobDetails";
import AddJob from './pages/AddJob'; 
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search-jobs" element={<SearchJobs />} />
              <Route path="/search" element={<SearchJobs />} />
              <Route path="/job/:jobId" element={<JobDetails />} /> 
              <Route path="/add-job" element={<AddJob />} />
              
      
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
