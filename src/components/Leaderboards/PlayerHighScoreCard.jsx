import { format } from "date-fns";

export default function PlayerHighScoreCard({ highScore, index }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{highScore.player_name}</td>
      <td>{format(new Date(highScore.achieved_at), "MMM dd, yyyy HH:mm")}</td>
      <td>{highScore.completion_time}</td>
      <td>{highScore.score}</td>
    </tr>
  );
}
