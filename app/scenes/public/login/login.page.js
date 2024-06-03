import { navigateTo } from "../../../Router";
import { decryptData, encryptData } from "../../../../encrypt";

export function Login() {
  const root = document.getElementById("root");
  root.innerHTML = /*html*/ `
        <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    `;

  const $loginForm = document.getElementsByTagName("form")[0];
  $loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const $userEmail = document.querySelector('input[type="email"]');
    const $userPassword = document.querySelector('input[type="password"]');

    if (!$userPassword.value || !$userEmail.value) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const UserrFetch = await fetch('http://localhost:3000/users');

      if (!UserrFetch.ok) {
        alert('Error al iniciar sesión');
        return;
      }

      const userToJson = await UserrFetch.json();
      const userFound = userToJson.find(user => user.email === $userEmail.value);

      if (!userFound) {
        alert('Usuario no encontrado');
        return;
      }

      if (decryptData(userFound.password) !== $userPassword.value) {
        alert('Contraseña incorrecta');
        return;
      }

      const token = Math.random().toString(36).substring(2)
      localStorage.setItem('token', token)
      setTimeout(() => {
        navigateTo('/tasks')
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al intentar iniciar sesión. Por favor, intenta de nuevo.');
    }
  });
}
