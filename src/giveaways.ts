import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const currentUser = programData.users.find(
    (user) => email === user.email && password === user.password
  );

  if (!currentUser) {
    console.error("Compruebe los credenciales e introdúzcalos de nuevo");
    process.exit();
  }

  currentUser.isAdmin
    ? (programData.isAdmin = true)
    : (programData.isAdmin = false);

  programData.userEmail = email;
};
