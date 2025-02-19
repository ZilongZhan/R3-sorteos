import { askUser } from "./askUser.js";
import {
  createGiveaway,
  // , deleteGiveaway
  // , enterGiveaway
  listGiveaways,
  // , listUserGiveaways
} from "./giveaways.js";
import { programData } from "./storage.js";

export const askUserNewGiveawayData = (): {
  giveawayName: string;
  giveawaySocialNetwork: string;
} => {
  const giveawayName = askUser("Nombre del sorteo: ");
  const giveawaySocialNetwork = askUser("Red social: ");

  return {
    giveawayName,
    giveawaySocialNetwork,
  };
};

export const printMainMenu = (): void => {
  const isAdmin = programData.isAdmin;
  console.log("\nMenú de opciones:");

  if (isAdmin) {
    console.log(`
      1. Listar sorteos disponibles
      2. Crear un sorteo
      3. Eliminar un sorteo
      4. Salir
    `);
  } else {
    console.log(`    
      1. Listar sorteos disponibles
      2. Inscribirte a un sorteo
      3. Consultar tus inscripciones a sorteos
      4. Salir
  `);
  }

  const mainOption = askUser("¿Qué quieres hacer? ");

  processMainMenuOption(+mainOption);
};

export const processMainMenuOption = (option: number): void => {
  const isAdmin = programData.isAdmin;

  switch (option) {
    case 1:
      listGiveaways();
      printMainMenu();
      break;
    case 2:
      if (isAdmin) {
        createGiveaway();
        printMainMenu();
      } else {
        const giveawayNumber = askUser("¿En qué sorteo quieres inscribirte? ");
        // enterGiveaway(+giveawayNumber);
        printMainMenu();
      }
      break;
    case 3:
      if (isAdmin) {
        const giveawayNumber = askUser("¿Qué sorteo quieres eliminar? ");
        // deleteGiveaway(+giveawayNumber);
        printMainMenu();
      } else {
        // listUserGiveaways();
        printMainMenu();
      }
      break;
    case 4:
      console.log("¡Adiós!");
      process.exit(1);
  }
};
