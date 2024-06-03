import img from '../src/img/tasks-img.png';
import styles from './styles-navbar.css';
import { navigateTo } from '../Router';

export function PrivateNavBar($content, logic) {
    const $nav = /*html*/`
      <nav class="${styles['navbar-container']}">
            <ul class="${styles['routes']}">
                <li><a href="/tasks">Tasks</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
            <img src="${img}" alt="tasks-img" class="${styles['tasks-img']}" />
        </nav>
    `
    document.getElementById('root').innerHTML = /*html*/ `
        ${$nav}
        ${$content}
    `;

    logic();
    const $logOut = document.querySelector("[href='/logout']")

    $logOut.addEventListener('click', (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        navigateTo('/login')
    })
}
