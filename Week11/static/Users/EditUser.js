// Използвайки Web Components, lit-html, express и mongo създайте просто приложение, чиято основна функционалнсот e CRUD на потребители. Приложението трябва да има следните страници - user list и user entity.
import { html, render } from "../lit-html/lit-html.js";

// items, keyFunction, itemTemplate
const appTemplate = (context) =>
  html`<div>
    ${context.isLoading
      ? "Loading user..."
      : html` <p>Editing user: ${context.user.firstName}</p>
          <form id="new-user-form">
            <label for="fname">First name:</label><br />
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="John"
              value="${context.user.firstName}"
            /><br />
            <label for="lname">Last name:</label><br />
            <input
              type="text"
              id="lname"
              name="lname"
              placeholder="Doe"
              value="${context.user.lastName}"
            /><br />
            <label for="age">Age:</label><br />
            <input
              type="number"
              id="age"
              name="age"
              placeholder="42"
              value="${context.user.age}"
            /><br /><br />
            <input
              type="submit"
              value="Submit"
              ?disabled=${context.isLoading}
              @click=${context.handleSubmit}
            />
          </form>`}
    <button @click=${() => window.history.back()}>Go back</button>
    ${context.message ? html`${context.message}` : ""}
  </div> `;

var getParams = function (url) {
  var params = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

export class EditUser extends HTMLElement {
  constructor() {
    super();
    this.isLoading = false;
    this.attachShadow({ mode: "open" });
    this.params = getParams(location.href);
    this.user = this.getUser(this.params);
    this.updateTemplate();
  }

  updateTemplate = () => {
    render(appTemplate(this), this.shadowRoot);
  };

  getUser = ({ id }) => {
    this.isLoading = true;
    this.updateTemplate();
    fetch("/api/users/" + id)
      .then((res) => res.json())
      .then((user) => {
        this.user = user;
      })
      .finally(() => {
        this.isLoading = false;
        this.updateTemplate();
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.isLoading = true;
    const firstName = this.shadowRoot.getElementById("fname").value;
    const lastName = this.shadowRoot.getElementById("lname").value;
    const age = this.shadowRoot.getElementById("age").value;
    this.updateTemplate();
    fetch("/api/users/" + this.user.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, age }),
    })
      .then((res) => res.json())
      .then((user) => {
        this.user = user;
        this.message = "Succesfully updated " + this.user.firstName;
      })
      .finally(() => {
        this.isLoading = false;
        this.updateTemplate();
      });
  };
}
