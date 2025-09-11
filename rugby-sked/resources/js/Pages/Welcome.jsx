import { Head, usePage, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import FixtureList from "@/Components/FixtureList";
import FixtureFilters from "@/Components/FixtureFilters";
import React from "react";

export default function Welcome() {
    const { auth, fixtures, userFavorites } = usePage().props;

    const [filters, setFilters] = React.useState({
        searchTeam: "",
        dateFilter: "",
        categoryFilter: "",
        statusFilter: "",
    });

    const handleToggleFavorite = (fixtureId) => {
        if (!auth.user) {
            alert("You must be logged in to save fixtures.");
            return;
        }

        router.post(
            `/dashboard/${fixtureId}/toggle-favorite`,
            {},
            {
                preserveScroll: true,
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
            !filters.dateFilter || fixture.date.startsWith(filters.dateFilter);

        const matchStatus =
            !filters.statusFilter || fixture.status === filters.statusFilter;

        return matchCategory && matchTeam && matchDate && matchStatus;
    });

    return (
        <GuestLayout>
            <Head title="RugbySked" />
            <div className="max-w-4xl mx-auto py-8">
                <h2 className="text-4xl font-bold mb-6">Filter Matches</h2>
                <FixtureFilters onFilterChange={setFilters} />
            </div>

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Matches:</h1>
                <FixtureList
                    fixtures={filteredFixtures}
                    userFavorites={userFavorites || []}
                    onToggleFavorite={handleToggleFavorite}
                />
            </div>
        </GuestLayout>
    );
}
