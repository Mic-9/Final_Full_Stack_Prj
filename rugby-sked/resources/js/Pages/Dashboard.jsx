import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import FixtureList from "@/Components/FixtureList";
import FixtureFilters from "@/Components/FixtureFilters";
import React from "react";

export default function Dashboard() {
    const { auth, fixtures: initialFixtures } = usePage().props;

    const [filters, setFilters] = React.useState({
        searchTeam: "",
        dateFilter: "",
        categoryFilter: "",
        statusFilter: "",
    });

    const [fixtures, setFixtures] = React.useState(initialFixtures);

    const handleToggleFavorite = (fixtureId) => {
        setFixtures((prev) => prev.filter((f) => f.id !== fixtureId));

        router.post(
            `/dashboard/${fixtureId}/toggle-favorite`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setFixtures((prev) =>
                        prev.filter((f) => f.id !== fixtureId)
                    );
                },
            }
        );
    };

    const filteredFixtures = fixtures.filter((fixture) => {
        const teamName = fixture.team_1 + fixture.team_2;
        const matchCategory =
            !filters.categoryFilter ||
            teamName.includes(filters.categoryFilter);
        const matchTeam =
            !filters.searchTeam ||
            fixture.team_1
                .toLowerCase()
                .includes(filters.searchTeam.toLowerCase()) ||
            fixture.team_2
                .toLowerCase()
                .includes(filters.searchTeam.toLowerCase());

        const matchDate =
            !filters.dateFilter ||
            fixture.date.slice(0, 10) === filters.dateFilter;
        const matchStatus =
            !filters.statusFilter || fixture.status === filters.statusFilter;

        return matchCategory && matchTeam && matchDate && matchStatus;
    });

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard - Rugby Sked" />

            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-4xl font-bold mb-6">
                    Filter Saved Matches:
                </h2>
                <FixtureFilters onFilterChange={setFilters} />
            </div>

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Saved Matches:</h1>
                {filteredFixtures.length === 0 ? (
                    <p className="text-gray-500">No matches found.</p>
                ) : (
                    <FixtureList
                        fixtures={filteredFixtures}
                        userFavorites={fixtures.map((f) => f.id)}
                        onToggleFavorite={handleToggleFavorite}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
