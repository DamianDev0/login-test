export function Login() {
  const root = document.getElementById("root");
  root.innerHTML = /*html*/ `
        <form>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    `;

  const $loginForm = document.getElementsByTagName("form")[0];
  
}
