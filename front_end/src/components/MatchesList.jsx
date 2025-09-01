import { useEffect, useState } from "react";
import axios from "axios";

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = () => {
    setTeam("");
    setDate("");
    setCategory("");
    setStatus("");
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const params = {};

        if (team) {
          params.team = team;
        }
        if (category) {
          params.category = category;
        }

        if (date) {
          const [year, month] = date.split("-");
          params.month = month;
          params.year = year;
        }
        if (status) {
          params.status = status;
        }

        const response = await axios.get("http://localhost:8000/api/matches", {
          params,
        });

        setMatches(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [team, date, category, status]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />{" "}
        <br />
        <input
          type="month"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />{" "}
        <br />
        <label>
          <input
            type="radio"
            name="category"
            value="M"
            checked={category === "M"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Men
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="W"
            checked={category === "W"}
            onChange={(e) => setCategory(e.target.value)}
          />
          Women
        </label>
        <label>
          <input
            type="radio"
            name="category"
            value="U20"
            checked={category === "U20"}
            onChange={(e) => setCategory(e.target.value)}
          />
          U20
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="status"
            value="scheduled"
            checked={status === "scheduled"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Scheduled
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="finished"
            checked={status === "finished"}
            onChange={(e) => setStatus(e.target.value)}
          />
          Finished
        </label>
        <br />
        <button type="button" onClick={handleReset}>
          Reset filters
        </button>
      </form>
      <h3>Upcoming Matches:</h3>
      {loading ? (
        <p>Loading matches...</p>
      ) : matches.length > 0 ? (
        <ol>
          {matches.map((match) => {
            const matchDate = new Date(match.match_date);
            const formattedDate = matchDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            const formattedTime = matchDate.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li key={match.id}>
                {match.team_1} vs {match.team_2} - {formattedDate}{" "}
                {formattedTime}
                <br />
                {match.team_1_score !== null && match.team_2_score !== null && (
                  <>
                    Result: {match.team_1_score} - {match.team_2_score}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

export default MatchesList;
