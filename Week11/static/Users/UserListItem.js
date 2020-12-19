import { html, render } from "../lit-html/lit-html.js";

export class UserListItem extends HTMLElement {
  constructor() {
    super();
    debugger;
    this.attachShadow({ mode: "open" });
    console.log(this.getAttribute("user"));
    this.user = this.getAttribute("user");
    render(html`${this.user.firstName}`, this.shadowRoot);
  }
}
