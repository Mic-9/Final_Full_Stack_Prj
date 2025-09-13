import React from "react";
import FixtureCard from "./FixtureCard";

const FixtureList = ({ fixtures, userFavorites = [], onToggleFavorite }) => {
    if (!fixtures || fixtures.length === 0) {
        return (
            <p className="text-gray-400 text-center">No matches available.</p>
        );
    }

    return (
        <div className="grid gap-4">
            {fixtures.map((fixture) => (
                <FixtureCard
                    key={fixture.id}
                    fixture={fixture}
                    isFavorite={userFavorites.includes(fixture.id)}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default FixtureList;
