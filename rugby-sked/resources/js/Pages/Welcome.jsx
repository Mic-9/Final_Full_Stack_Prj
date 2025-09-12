import { Head, usePage, router } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FixtureList from "@/Components/FixtureList";
import FixtureFilters from "@/Components/FixtureFilters";
import React from "react";

export default function Welcome() {
    const { auth, fixtures, userFavorites: initialFavorites } = usePage().props;

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    const [filters, setFilters] = React.useState({
        searchTeam: "",
        dateFilter: "",
        categoryFilter: "",
        statusFilter: "",
    });

    const [userFavorites, setUserFavorites] = React.useState(
        initialFavorites || []
    );

    React.useEffect(() => {
        if (auth.user) {
            setUserFavorites(initialFavorites || []);
        } else {
            setUserFavorites([]);
        }
    }, [auth.user, initialFavorites]);

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
                onSuccess: () => {
                    setUserFavorites((prev) =>
                        prev.includes(fixtureId)
                            ? prev.filter((id) => id !== fixtureId)
                            : [...prev, fixtureId]
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
        <Layout>
            <Head title="RugbySked" />

            <h2 className="text-4xl font-bold m-6">RugbySked</h2>

            <div className="max-w-4xl mx-auto py-2">
                <FixtureFilters onFilterChange={setFilters} />
            </div>

            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6">Matches:</h1>
                <FixtureList
                    fixtures={filteredFixtures}
                    userFavorites={userFavorites}
                    onToggleFavorite={handleToggleFavorite}
                />
            </div>
        </Layout>
    );
}
