import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProjectsList from "views/ProjectsList";
import Dashboard from "views/Dashboard";

export default () => {
    return <Router>
        <Routes>
            <Route>
                <Route index element={<ProjectsList />} />
                <Route path="debug" element={<Dashboard />} />

            </Route>
        </Routes>
    </Router>
};