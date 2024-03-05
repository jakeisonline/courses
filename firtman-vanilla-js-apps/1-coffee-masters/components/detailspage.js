export class DetailsPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    const loadCSS = async () => {
      const request = await fetch("./components/detailspage.css");
      const css = await request.text();
      styles.textContent = css;
    };

    loadCSS();
  }

  connectedCallback() {
    const template = document.getElementById("details-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);
  }
}

customElements.define("details-page", DetailsPage);
