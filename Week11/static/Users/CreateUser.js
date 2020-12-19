// Използвайки Web Components, lit-html, express и mongo създайте просто приложение, чиято основна функционалнсот e CRUD на потребители. Приложението трябва да има следните страници - user list и user entity.
import { html, render } from "../lit-html/lit-html.js";

// items, keyFunction, itemTemplate
const appTemplate = (context) =>
  html`<div>
    <form id="new-user-form">
      <label for="fname">First name:</label><br />
      <input type="text" id="fname" name="fname" placeholder="John" /><br />
      <label for="lname">Last name:</label><br />
      <input type="text" id="lname" name="lname" placeholder="Doe" /><br />
      <label for="age">Age:</label><br />
      <input type="number" id="age" name="age" placeholder="42" /><br /><br />
      <input
        type="submit"
        value="Submit"
        ?disabled=${context.isLoading}
        @click=${context.handleSubmit}
      />
    </form>
    <button @click=${() => window.history.back()}>Go back</button>
    ${context.message ? html`${context.message}` : ""}
  </div> `;

export class CreateUser extends HTMLElement {
  constructor() {
    super();
    this.isLoading = false;
    this.attachShadow({ mode: "open" });
    this.updateTemplate();
  }

  updateTemplate = () => {
    render(appTemplate(this), this.shadowRoot);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.isLoading = true;
    this.updateTemplate();
    console.log(this.shadowRoot);
    const firstName = this.shadowRoot.getElementById("fname").value;
    const lastName = this.shadowRoot.getElementById("lname").value;
    const age = this.shadowRoot.getElementById("age").value;
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, age }),
    })
      .then((res) => res.json())
      .then((user) => {
        this.message = `User ${user.firstName} created.`;
      })
      .catch((err) => console.log(err))
      .finally(() => {
        this.isLoading = false;
        this.updateTemplate();
      });
  };
}
