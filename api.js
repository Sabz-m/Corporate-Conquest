import axios from "axios";

const gameApi = axios.create({
  baseURL: "https://corporate-conquest-db.onrender.com/api",
});

export const getLeaderboard = () => {
  return gameApi
    .get("/leaderboard", {
      params: {},
    })
    .then(({ data: { entries } }) => {
      console.log(entries);
      return entries;
    });
};
