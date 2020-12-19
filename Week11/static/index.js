import { UserList } from "./Users/UserList.js";
import { CreateUser } from "./Users/CreateUser.js";
import { EditUser } from "./Users/EditUser.js";

customElements.define("user-list", UserList);
customElements.define("create-user", CreateUser);
customElements.define("edit-user", EditUser);
