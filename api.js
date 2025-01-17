import axios from "axios";

const gameApi = axios.create({
  baseURL: "",
});

export const getLeaderboard = () => {
  return gameApi
    .get("/leaderboards", {
      params: {},
    })
    .then(({ data: { leaderboard } }) => {
      return leaderboard;
    });
};
