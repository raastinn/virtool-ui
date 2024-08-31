import { Container } from "@base";
import React from "react";
import { Route, Routes } from "react-router-dom-v5-compat";
import JobDetail from "./JobDetail";
import JobsList from "./JobList";

/**
 * The jobs view with routes to job-related components
 */
export default function Jobs() {
    return (
        <Container>
            <Routes>
                <Route path="/jobs" element={<JobsList />} />
                <Route path="/jobs/:jobId" element={<JobDetail />} />
            </Routes>
        </Container>
    );
}
