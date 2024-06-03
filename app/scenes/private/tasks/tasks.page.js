import styles from './styles.tasks.css';
import { navigateTo } from '../../../Router';

export function Tasks() {
    const $content = /*html*/`
       <form>
        <input type="text" placeholder="title" id="title">
        <input type="text" placeholder="description" id="description">
        <select name="priority">
            <option value="disabled selected">--Select--</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <input type="date" id="date">
        <button type="submit">Send</button>
       </form>
       <div id="all-tasks"></div>
    `;

    const logic = async () => {
        // Fetch para mostrar las tareas en el contenedor vacío
        const $taskContainer = document.getElementById('all-tasks');
        const allTasks = await fetch('http://localhost:3000/tasks');
        const responseJson = await allTasks.json();

        responseJson.forEach(task => {
            $taskContainer.innerHTML += /*html*/`
                <div class="${styles.card}">
                    <h2>${task.title}</h2>
                    <p>${task.description}</p>
                    <p>${task.priority}</p>
                    <p>${task.date}</p>
                    <button class="editBtn" data-id="${task.id}">Edit</button>
                    <button class="deleteBtn" data-id="${task.id}">Delete</button>
                    <button class="previewBtn">Preview</button>
                </div>
            `;
        });

        // Enviar a la vista de editar
        const $editButtons = document.getElementsByClassName('editBtn');
        for (let $editBtn of $editButtons) {
            $editBtn.addEventListener('click', () => {
                navigateTo(`/tasks/edit?taskId=${$editBtn.getAttribute('data-id')}`);
            });
        }

        // Enviar a la vista de borrar
        const $deleteButtons = document.getElementsByClassName('deleteBtn');
        for (let $deleteBtn of $deleteButtons) {
            $deleteBtn.addEventListener('click', async () => {
                const taskId = $deleteBtn.getAttribute('data-id');
                await fetch(`http://localhost:3000/tasks/${taskId}`, {
                    method: 'DELETE',
                });
                location.reload();
            });
        }

        const $form = document.querySelector('form');
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const $inputTitle = document.getElementById('title').value;
            const $inputDescription = document.getElementById('description').value;
            const $inputPriority = document.querySelector("[name='priority']").value;
            const $inputDate = document.getElementById('date').value;

            // Fetch para agregar una nueva tarea
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: $inputTitle,
                    description: $inputDescription,
                    priority: $inputPriority,
                    date: $inputDate
                })
            });
            const jsonObject = await response.json();
            console.log(jsonObject);

            // Recargar la página después de enviar el formulario
            location.reload();
        });
    };

    return {
        $content,
        logic
    };
}
