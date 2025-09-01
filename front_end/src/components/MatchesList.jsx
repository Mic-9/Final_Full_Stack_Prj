import React, { useEffect, useState } from "react";
import axios from "axios";

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/matches");
        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <p>Loading matches...</p>;
  }

  return (
    <div>
      <h2>Upcoming Matches:</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.team_1} vs {match.team_2} - {match.match_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesList;
