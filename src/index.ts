import { askUser, askUserHidden } from "./askUser.js";
import { loginUser } from "./giveaways.js";

import { loadData } from "./storage.js";
import { printMainMenu } from "./ui.js";

const email = askUser("Introduce tu email: ");
const password = askUserHidden("Introduce tu contraseña: ");

loadData();

loginUser(email, password);

printMainMenu();
