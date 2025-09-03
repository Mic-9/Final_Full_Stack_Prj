import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import React from "react";

export default function Welcome({ auth }) {
    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFixtures = async () => {
            try {
                const response = await fetch("/api/fixtures");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFixtures(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFixtures();
    }, []);

    if (loading) {
        return <p>Caricamento in corso...</p>;
    }

    if (error) {
        return <p>Errore nel caricamento delle partite: {error}</p>;
    }
    return (
        <>
            <Head title="Welcome" />
            <div style={{ padding: "24px", textAlign: "right" }}>
                {auth.user ? (
                    <a href="/dashboard">Dashboard</a>
                ) : (
                    <>
                        <a href="/login">Log in</a>
                        <br />
                        <a href="/register">Register</a>
                    </>
                )}
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>RugbySked</h1>
                <div>
                    <h2>Lista Partite:</h2>
                    {fixtures.length > 0 ? (
                        <ul>
                            {fixtures.map((fixture) => (
                                <li key={fixture.id}>
                                    <h3>
                                        {fixture.team_1} vs {fixture.team_2}
                                    </h3>
                                    <span>
                                        {fixture.status === "finished"
                                            ? "Conclusa"
                                            : "In Programma"}
                                    </span>
                                    <p>
                                        Data:{" "}
                                        {new Date(fixture.date).toLocaleString(
                                            "it-IT",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </p>
                                    {fixture.status === "finished" && (
                                        <p>
                                            Punteggio: {fixture.score_1} -{" "}
                                            {fixture.score_2}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nessuna partita trovata.</p>
                    )}
                </div>
            </div>
        </>
    );
}
