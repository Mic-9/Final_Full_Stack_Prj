import React from "react";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const FixtureCard = ({ fixture, isFavorite, onToggleFavorite }) => {
    const handleToggle = () => {
        if (onToggleFavorite) {
            onToggleFavorite(fixture.id);
        }
    };

    return (
        <div className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">
                    {fixture.team_1} vs {fixture.team_2}
                </h2>
                <span className="text-sm text-gray-500">
                    {new Date(fixture.date).toLocaleDateString()}
                </span>
            </div>
            <div className="mb-2">
                {fixture.status === "finished" ? (
                    <span className="text-gray-700">
                        Result: {fixture.score_1} - {fixture.score_2}
                    </span>
                ) : (
                    <span className="text-green-600">Scheduled</span>
                )}
            </div>
            <div className="text-right">
                {isFavorite ? (
                    <SecondaryButton onClick={handleToggle}>
                        Delete from favorites
                    </SecondaryButton>
                ) : (
                    <PrimaryButton onClick={handleToggle}>Save</PrimaryButton>
                )}
            </div>
        </div>
    );
};

export default FixtureCard;
