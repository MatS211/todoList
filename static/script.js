function new_date(){
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,"0");
    const day = String(date.getDate()).padStart(2,"0");
    const hour = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}


function addTask(){
    const tytul = document.getElementById("tytul").value;
    const opis = document.getElementById("opis").value;
    const kategoria = document.getElementById("kategoria").value;
    
    fetch("/api/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ tytul, opis, kategoria})
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            const tableBody = document.querySelector("table tbody");
            const newRow = document.createElement("tr");
            newRow.id = `task-${data.id}`;
            newRow.innerHTML = `
                <td>${data.tytul}</td>
                <td>${data.opis}</td>
                <td>${data.kategoria}</td>
                <td>${data.status = "0"}</td>
                <td>${new_date()}</td>
                <td>
                    <button onclick="editTask(${data.id})">Edytuj</button>
                    <button onclick="deleteTask(${data.id})">Usuń</button>
                </td>
            `;
            tableBody.appendChild(newRow);

            // document.getElementById("tytul").value = "";
            // document.getElementById("opis").value = "";
            location.reload();
        } else {
            alert("Błąd podczas dodawania zadania: " + (data.error || "Nieznany błąd"));
        }
    })
    .catch(error => {
        console.error("Błąd:", error);
        alert("Wystąpił błąd przy dodawaniu zadania.");
    });
}


function editTask(taskId) {
    const newTytul = prompt("Podaj nowy tytuł (pozostaw puste, aby nie zmieniać):");
    const newOpis = prompt("Podaj nowy opis (pozostaw puste, aby nie zmieniać):");
    const newKategoria = prompt("Podaj nową kategorię (pozostaw puste, aby nie zmieniać):");
    const newStatus = prompt("Podaj nowy status (pozostaw puste, aby nie zmieniać):");

    const updatedFields = {};
    if (newTytul) updatedFields.tytul = newTytul;
    if (newOpis) updatedFields.opis = newOpis;
    if (newKategoria) updatedFields.kategoria = newKategoria;
    if (newStatus) updatedFields.status = newStatus;

    if (Object.keys(updatedFields).length === 0) {
        alert("Nie dokonano żadnych zmian.");
        return;
    }

    fetch(`/api/update/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFields)
    })
    .then(response => response.json())
    .then(data => {
        if (!data.error) {
            if (data.tytul) document.querySelector(`#task-${taskId} td:nth-child(1)`).innerText = data.tytul;
            if (data.opis) document.querySelector(`#task-${taskId} td:nth-child(2)`).innerText = data.opis;
            if (data.kategoria) document.querySelector(`#task-${taskId} td:nth-child(3)`).innerText = data.kategoria;
            if (data.status == 0 || data.status == 1) document.querySelector(`#task-${taskId} td:nth-child(4)`).innerText = data.status;
            location.reload();
        } else {
            alert("Błąd podczas edycji zadania: " + data.error);
        }
    })

    // .catch(error => {
    //     console.error("Błąd:", error);
    //     alert("Wystąpił błąd przy aktualizacji zadania.");
    // });
}

function deleteTask(taskId) {
    fetch(`/api/delete/${taskId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                const row = document.getElementById(`task-${taskId}`);
                if (row) row.remove();
                location.reload();
            } else {
                alert("Błąd podczas usuwania zadania: " + (data.error || "Nieznany błąd"));
            }
        });
}          