import Store from "./services/store.js";
import API from "./services/api.js";
import { loadData } from "./services/menu.js"

window.app = {};
app.store = Store;

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
});
