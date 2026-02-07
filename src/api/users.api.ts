import { delay } from "../utils/delay";

export const getUsers = async () => {
  await delay(500);

  return [
    { id: "1", name: "Aniket" },
    { id: "2", name: "Gawade" },
  ];
};
