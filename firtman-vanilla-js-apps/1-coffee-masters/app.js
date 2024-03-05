import Store from "./services/store.js";
import API from "./services/api.js";
import { loadData } from "./services/menu.js"
import Router from "./services/router.js";
import { MenuPage } from "./components/menupage.js";
import { DetailsPage } from "./components/detailspage.js";
import { OrderPage } from "./components/orderpage.js";

window.app = {};
app.store = Store;
app.router = Router

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});
