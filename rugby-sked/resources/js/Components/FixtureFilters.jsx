import React, { useState, useEffect } from "react";

const FixtureFilters = ({ onFilterChange }) => {
    const [searchTeam, setSearchTeam] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        onFilterChange({
            searchTeam,
            dateFilter,
            categoryFilter,
            statusFilter,
        });
    }, [searchTeam, dateFilter, categoryFilter, statusFilter, onFilterChange]);

    const resetFilters = () => {
        setSearchTeam("");
        setDateFilter("");
        setCategoryFilter("");
        setStatusFilter("");
    };

    return (
        <div className="mb-6 border border-gray-700 bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2 text-gray-100">Filter:</h3>
            <form className="w-full max-w-md flex flex-col items-center gap-4">
                <div className="mb-2">
                    <label className="mr-2 text-gray-300">
                        Search by team:{" "}
                    </label>
                    <input
                        type="text"
                        placeholder="Team"
                        value={searchTeam}
                        onChange={(e) => setSearchTeam(e.target.value)}
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-100 placeholder-gray-500"
                    />
                </div>

                <div className="mb-2">
                    <label className="mr-2 text-gray-300">
                        Filter by date:{" "}
                    </label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="border border-gray-600 rounded px-2 py-1 bg-gray-900 text-gray-100 placeholder-gray-500"
                    />
                </div>

                <div className="mb-2">
                    <span className="mr-2 text-gray-300">Category: </span>
                    <label className="mr-2 text-gray-400">
                        <input
                            type="radio"
                            name="category"
                            value="(M)"
                            checked={categoryFilter === "(M)"}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />{" "}
                        Men
                    </label>
                    <label className="mr-2 text-gray-400">
                        <input
                            type="radio"
                            name="category"
                            value="(W)"
                            checked={categoryFilter === "(W)"}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />{" "}
                        Women
                    </label>
                    <label className="text-gray-400">
                        <input
                            type="radio"
                            name="category"
                            value="(U20)"
                            checked={categoryFilter === "(U20)"}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        />{" "}
                        U20
                    </label>
                </div>

                <div className="mb-2">
                    <span className="mr-2 text-gray-300">Status: </span>
                    <label className="mr-2 text-gray-400">
                        <input
                            type="radio"
                            name="status"
                            value="finished"
                            checked={statusFilter === "finished"}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        />{" "}
                        Finished
                    </label>
                    <label className="text-gray-400">
                        <input
                            type="radio"
                            name="status"
                            value="scheduled"
                            checked={statusFilter === "scheduled"}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        />{" "}
                        Scheduled
                    </label>
                </div>

                <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-2 px-3 py-1 bg-gray-700 text-gray-100 rounded hover:bg-gray-600 transition"
                >
                    Reset Filters
                </button>
            </form>
        </div>
    );
};

export default FixtureFilters;
