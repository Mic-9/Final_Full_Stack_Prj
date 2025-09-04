import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import React from "react";

export default function Welcome({ auth }) {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTeam, setSearchTeam] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await fetch("/api/fixtures");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFixtures(data);
                console.log(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFixtures();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const filteredFixtures = [...fixtures]
        .sort((a, b) => a.id - b.id)
        .filter(
            (fixture) =>
                searchTeam === "" ||
                fixture.team_1
                    .toLowerCase()
                    .includes(searchTeam.toLowerCase()) ||
                fixture.team_2.toLowerCase().includes(searchTeam.toLowerCase())
        )
        .filter(
            (fixture) => statusFilter === "" || fixture.status === statusFilter
        )
        .filter((fixture) => {
            if (!dateFilter) {
                return true;
            }
            const filterDate = new Date(dateFilter + "T00:00:00");
            const fixtureDate = new Date(fixture.date);
            return (
                filterDate.getFullYear() === fixtureDate.getFullYear() &&
                filterDate.getMonth() === fixtureDate.getMonth() &&
                filterDate.getDate() === fixtureDate.getDate()
            );
        })
        .filter(
            (fixture) =>
                categoryFilter === "" ||
                fixture.team_1.includes(categoryFilter) ||
                fixture.team_2.includes(categoryFilter)
        );

    const resetFilters = () => {
        setSearchTeam("");
        setStatusFilter("");
        setDateFilter("");
        setCategoryFilter("");
    };

    return (
        <>
            <Head title="Welcome" />
            <div>
                {auth.user ? (
                    <a href="/dashboard">Dashboard</a>
                ) : (
                    <>
                        <a href="/login">Log in</a>
                        <a href="/register">Register</a>
                    </>
                )}
            </div>
            <h1>RugbySked</h1>
            <h3>Filter:</h3>
            <form>
                <label>Search by team: </label>
                <input
                    type="text"
                    placeholder="Team"
                    value={searchTeam}
                    onChange={(e) => setSearchTeam(e.target.value)}
                />
                <br />
                <label>Filter by date: </label>
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />{" "}
                <br />
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="(M)"
                        checked={categoryFilter === "(M)"}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    />{" "}
                    Men
                </label>
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="(W)"
                        checked={categoryFilter === "(W)"}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    />{" "}
                    Women
                </label>
                <label>
                    <input
                        type="radio"
                        name="category"
                        value="(U20)"
                        checked={categoryFilter === "(U20)"}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    />{" "}
                    U20
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        name="status"
                        value="finished"
                        checked={statusFilter === "finished"}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    />{" "}
                    Finished
                </label>
                <label>
                    <input
                        type="radio"
                        name="status"
                        value="scheduled"
                        checked={statusFilter === "scheduled"}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    />{" "}
                    Scheduled
                </label>
                <br />
                <button type="button" onClick={resetFilters}>
                    Reset Filters
                </button>
            </form>
            <h2>Match List:</h2>
            {filteredFixtures.length > 0 ? (
                <ol>
                    {filteredFixtures.map((fixture) => (
                        <li key={fixture.id}>
                            <h3>
                                {fixture.team_1} vs {fixture.team_2}
                            </h3>
                            <span>
                                {fixture.status === "finished"
                                    ? "Finished"
                                    : "Scheduled"}
                            </span>
                            <p>
                                Date:{" "}
                                {new Date(fixture.date).toLocaleString(
                                    "en-GB",
                                    {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    }
                                )}
                            </p>
                            {fixture.status === "finished" && (
                                <p>
                                    Result: {fixture.score_1} -{" "}
                                    {fixture.score_2}
                                </p>
                            )}
                        </li>
                    ))}
                </ol>
            ) : (
                <p>No matches found.</p>
            )}
        </>
    );
}
