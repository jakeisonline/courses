import Store from "./services/store.js";
import API from "./services/api.js";
import { loadData } from "./services/menu.js"
import Router from "./services/router.js";
import { MenuPage } from "./components/menupage.js";
import DetailsPage from "./components/detailspage.js";
import OrderPage from "./components/orderpage.js";
import ProductItem from "./components/productitem.js";
import CartItem from "./components/cartitem.js";

window.app = {};
app.store = Store;
app.router = Router

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", e => {
  const badge = document.getElementById("badge");
  const quantity = app.store.cart.reduce(
    (acc, item) => acc + item.quantity, 0
  );
  badge.textContent = quantity;
  badge.hidden = quantity == 0;
})
