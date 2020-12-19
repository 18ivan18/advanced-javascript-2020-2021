// Използвайки Web Components, lit-html, express и mongo създайте просто приложение, чиято основна функционалнсот e CRUD на потребители. Приложението трябва да има следните страници - user list и user entity.
import { html, render } from "../lit-html/lit-html.js";
import { repeat } from "../lit-html/directives/repeat.js";
// import { UserListItem } from "./UserListItem.js";

// customElements.define("user-list-item", UserListItem);

const userTemplate = (user, context) =>
  html`<li part="list-item">
    ${user.firstName} ${user.lastName} is ${user.age} years old.
    <button
      @click=${() => {
        location.href = `editUser?id=${user.id}`;
      }}
      part="green button"
    >
      Edit
    </button>
    <button part="red button" @click=${() => context.deleteUser(user.id)}>
      Delete
    </button>
  </li>`;

// items, keyFunction, itemTemplate
const appTemplate = (context) =>
  html`<link rel="stylesheet" href="styles.css" />
    <div part="list-wrapper">
      ${context.isLoading
        ? "Loading users..."
        : html`<div part="list">
            <h1 part="usersHeader">Users</h1>
            <ul>
              ${repeat(
                context.users || [],
                (user) => user.id,
                (user) => userTemplate(user, context)
              )}
            </ul>
            <button part="button" @click=${context.loadUsers}>Refresh</button>
          </div>`}
      <button part="button" @click=${() => (location.href = "createUser")}>
        Create new user
      </button>
      ${context.message ? html`${context.message}` : ""}
    </div>`;

export class UserList extends HTMLElement {
  set users(users) {
    this._users = users;
    this.updateTemplate();
  }

  get users() {
    return this._users;
  }

  // set isLoading(isLoading) {
  //   console.log(isLoading);
  //   this._isLoading = isLoading;
  //   this.updateTemplate();
  // }

  // get isLoading() {
  //   return this._isLoading;
  // }

  constructor() {
    super();
    this.isLoading = false;
    this.attachShadow({ mode: "open" });
  }

  loadUsers = () => {
    this.users = null;
    this.isLoading = true;
    this.updateTemplate();
    fetch("/api/users")
      .then((res) => res.json())
      .then((users) => {
        this.users = users;
      })
      .finally(() => {
        this.isLoading = false;
        this.updateTemplate();
      });
  };

  deleteUser = (id) => {
    this.isLoading = true;
    this.updateTemplate();
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((user) => {
        this.message = `User ${user.firstName} is deleted.`;
        this.loadUsers();
      })
      .finally(() => {
        this.isLoading = false;
        this.updateTemplate();
      });
  };

  updateTemplate = () => {
    render(appTemplate(this), this.shadowRoot);
  };

  connectedCallback() {
    this.loadUsers();
    this.updateTemplate();
  }
}
