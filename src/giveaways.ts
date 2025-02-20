import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const currentUser = programData.users.find(
    (user) => email === user.email && password === user.password
  );

  if (!currentUser) {
    console.error("Comprueba los credenciales e introdúcelos de nuevo");
    process.exit();
  }

  currentUser.isAdmin
    ? (programData.isAdmin = true)
    : (programData.isAdmin = false);

  programData.userEmail = email;
};

export const createGiveaway = (): void => {
  const newGiveaway = askUserNewGiveawayData();

  if (!newGiveaway) {
    console.log("No se ha podido crear el sorteo. Inténta de nuevo.");
    return;
  }

  programData.giveaways.push({
    name: newGiveaway.giveawayName,
    socialNetwork: newGiveaway.giveawaySocialNetwork,
    participants: [],
  });

  saveData();
  console.log("El sorteo se ha creado correctamente.");
};

export const listGiveaways = (): void => {
  const giveaways = programData.giveaways;
  const giveawaysTotal = giveaways.length;

  if (!giveaways) {
    console.log("No hay ningún sorteo disponible ahora mismo.");
    return;
  }

  console.log(`Éstos son los ${giveawaysTotal} sorteos disponibles:\n`);

  giveaways.forEach((giveaway, index) => {
    console.log(`${index + 1}. ${giveaway.name}`);
  });
};

export const deleteGiveaway = (giveawayNumber: number): void => {
  const giveaways = programData.giveaways;
  const giveawayIndex = giveawayNumber - 1;
  const giveawayToDelete = giveaways.at(giveawayIndex);

  if (!giveawayToDelete) {
    console.log("El sorteo que has introducido no existe.");
    return;
  }

  programData.giveaways.splice(giveawayIndex, 1);

  saveData();
  console.log("El sorteo se ha eliminado correctamente.");
};

export const enterGiveaway = (giveawayNumber: number): void => {
  const giveaways = programData.giveaways;
  const giveawayIndex = giveawayNumber - 1;
  const giveawayToEnter = giveaways.at(giveawayIndex);

  const currentUserEmail = programData.userEmail;
  const userToEnter = programData.users.find(
    (user) => currentUserEmail === user.email
  )!;

  if (!giveawayToEnter) {
    console.log("El sorteo que has introducido no existe.");
    return;
  }

  const isAlreadyRegistered = giveawayToEnter.participants.some(
    (participant) => participant.email === currentUserEmail
  );

  if (isAlreadyRegistered) {
    console.log(
      `Ya estás inscrito en este sorteo. Prueba de inscribirte en otro.`
    );
    return;
  }

  giveawayToEnter.participants.push(userToEnter);

  saveData();
  console.log(`Te has inscrito al sorteo ${giveawayNumber} correctamente.`);
};

export const listUserGiveaways = (): void => {
  const giveaways = programData.giveaways;
  const currentUserEmail = programData.userEmail;

  const registeredGiveaways = giveaways.filter((giveaway) =>
    giveaway.participants.some(
      (participant) => currentUserEmail === participant.email
    )
  );
  const registeredGiveawaysTotal = registeredGiveaways.length;

  if (!registeredGiveaways) {
    console.log("No estás inscrito a ningún sorteo en este momento");
    return;
  }

  console.log(
    `Estás inscrito en los siguientes ${registeredGiveawaysTotal} sorteos:\n`
  );

  registeredGiveaways.forEach((giveaway, index) => {
    console.log(`${index + 1}. ${giveaway.name} en ${giveaway.socialNetwork}`);
  });
};
