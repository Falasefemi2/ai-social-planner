"use client";

import { useState } from "react";
import { TemplateList } from "./_components/template-list";
import { SearchDashboard } from "./_components/search-dashboard";

export default function DashboardPage() {
    const [searchInput, setSearchInput] = useState<string>();

    return (
        <>
            <SearchDashboard onSearchInput={setSearchInput} />
            <TemplateList searchInput={searchInput as string} />
        </>
    )
}