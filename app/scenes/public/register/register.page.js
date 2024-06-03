import { navigateTo } from "../../../Router";
import {encryptData} from '../../../../encrypt'

export function Register() {
  const root = document.getElementById("root");
  root.innerHTML = /*html*/ `
        <section>
            <form>
                <input type="text" name="name" placeholder="Name">
                <input type="email" name="email" placeholder="Email">
                <input type="password" name="password" placeholder="Password">
                <button type="submit">Register</button>
            </form>
        </section>
    `;

  // logic
  const $createUserForm = document.getElementsByTagName("form")[0];
  $createUserForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    const $userName = document.querySelector('[name="name"]');
    const $userEmail = document.querySelector('[name="email"]');
    const $userPassword = document.querySelector('[name="password"]');

    if (!$userName.value || !$userPassword.value || !$userEmail.value) {
      alert("todos los campos son para llenar");
    }

    const $userCreated = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        name: $userName.value,
        email: $userEmail.value,
        password:encryptData($userPassword.value),
      })

    });
    console.log($userCreated)
    if(!$userCreated){
        alert('error al crear')
        return
    }
    alert('creado melo')
    setTimeout(() => {
        navigateTo('/login')
    }, 2000);
  });
}
