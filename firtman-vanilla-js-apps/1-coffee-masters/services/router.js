const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach(a => {
      a.addEventListener("click", e => {
        e.preventDefault();
        Router.go(a.getAttribute("href"));
      });
    })

    window.addEventListener("popstate", e => {
      Router.go(e.state.route, false);
    });

    Router.go(location.pathname);
  },

  go: ( route, addToHistory=true ) => {
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement = null;

    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        pageElement.textContent = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        pageElement.textContent = "Your Order";
        break;
      default:
        if (route.startWith("/product/")) {
          pageElement = document.createElement("details-page");
          pageElement.textContent = "Details";
          const paramId = route.substring(route.lastIndexOf("/")+1);
          pageElement.dataset.id = paramId;
        }
    }

    const cache = document.querySelector("main");
    cache.innerHTML = "";
    cache.appendChild(pageElement);
    window.scrollX = 0;
    window.scrollY = 0;
  }
};

export default Router;
