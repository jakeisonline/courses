import API from "./api.js";

export async function loadData() {
  app.store.menu = await API.fetchMenu();
}
