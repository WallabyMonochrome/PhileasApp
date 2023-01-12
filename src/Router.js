import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProjectsList from "views/ProjectsList";
import ProjectDetail from "views/ProjectDetail";

export default () => {
    return <Router>
        <Routes>
            <Route>
                <Route index element={<ProjectsList />} />
                <Route path="project/:id" element={<ProjectDetail />} />
            </Route>
        </Routes>
    </Router>
};