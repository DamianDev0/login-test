export function TasksEdit() {
    const $content = /*html*/`
        <form id="edit-task-form">
            <input type="text" placeholder="title" id="title">
            <input type="text" placeholder="description" id="description">
            <select name="priority" id="priority">
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
        const searchParams = window.location.search;
        const paramsTransformed = new URLSearchParams(searchParams);
        const taskId = paramsTransformed.get('taskId');

        // Fetch task data
        const fetchTaskId = await fetch(`http://localhost:3000/tasks/${taskId}`);
        const responseJson = await fetchTaskId.json();

        // Set values in the form
        const $priority = document.getElementById('priority');
        const $title = document.getElementById('title');
        const $description = document.getElementById('description');
        const $date = document.getElementById('date');

        $priority.value = responseJson.priority;
        $title.value = responseJson.title;
        $description.value = responseJson.description;
        $date.value = responseJson.date;

        // Handle form submission
        const $form = document.getElementById('edit-task-form');
        $form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const updatedTask = {
                title: $title.value,
                description: $description.value,
                priority: $priority.value,
                date: $date.value
            };

            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                // Redirect or refresh the page after successful update
                alert('update succesful')
                window.location.href = '/tasks';
            } else {
                console.error('Failed to update task');
            }
        });
    };

    return {
        $content,
        logic
    };
}
