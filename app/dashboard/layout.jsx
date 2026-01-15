"use client";

import React from "react";

// The functionality has been moved to strict sub-layouts:
// - app/dashboard/student/layout.jsx
// - app/dashboard/admin/layout.jsx
// This root layout now simply passes content through.

export default function DashboardLayout({ children }) {
    return (
        <>
            {children}
        </>
    );
}
