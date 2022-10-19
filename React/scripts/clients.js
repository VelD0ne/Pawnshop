async function getClients() {
    const response = await fetch("http://localhost:3000/client");
    const clients = await response.json();
    return clients;
}

function cleanRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("hower");
    }
}

function fullfillForm(client) {
    clientForm.id = client.id;
    document.getElementById("clientId").innerHTML = `Клиент №${client.id}`;
    clientForm.clientName.value = client.name;
    clientForm.clientSurname.value = client.surname;
    clientForm.clientPatronomyc.value = client.patronomyc;
    clientForm.clientDate.value = client.date;
    clientForm.clientNumber.value = client.number;
    clientForm.clientGiver.value = client.giver;
}

function getForm() {
    const client = {
        id: clientForm.id,
        name: clientForm.clientName.value,
        surname: clientForm.clientSurname.value,
        patronomyc: clientForm.clientPatronomyc.value,
        date: clientForm.clientDate.value,
        number: clientForm.clientNumber.value,
        giver: clientForm.clientGiver.value,
    };
    return client;
}

function bindRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].onclick = (elem) => {
            cleanRows();
            let client = {
                id: elem.path[1].id,
                surname: elem.path[1].cells[0].innerHTML,
                name: elem.path[1].cells[1].innerHTML,
                patronomyc: elem.path[1].cells[2].innerHTML,
                number: elem.path[1].cells[3].innerHTML,
                date: elem.path[1].cells[4].innerHTML,
                giver: elem.path[1].cells[5].innerHTML,
            };
            fullfillForm(client);
            rows[i].classList.add("hower");
        };
    }
}

async function loadTable() {
    const clients = await getClients();
    document.querySelector("#tableBody tbody").innerHTML += clients
        .map((n, i) => {
            if (!document.getElementById(n.Клиент)) {
                return `
    <tr id='${n.Клиент}' class='row'>
        <td>${n.Фамилия}</td>
        <td>${n.Имя}</td>
        <td>${n.Отчество}</td>
        <td>${n["Номер паспорта"]}</td>
        <td>${n["Дача выдачи паспорта"].substring(0, 10)}</td>
        <td>${n["Кем выдан паспорт"]}</td>
    </tr>
    `;
            }
        })
        .join("");
}

async function loadPage() {
    await loadTable();
    bindRows();
}

function clearForm() {
    document.getElementById("categoryId").innerHTML = "Клиент №";

    clientForm.id = "";
    clientForm.clientName.value = "";
    clientForm.clientSurname.value = "";
    clientForm.clientPatronomyc.value = "";
    clientForm.clientDate.value = "";
    clientForm.clientNumber.value = "";
    clientForm.clientGiver.value = "";
}

async function insertClient() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const client = getForm();
    const response = await fetch("http://localhost:3000/client", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(client), // body data type must match "Content-Type" header
    });
    if (response.status === 200) {
        loadPage();
        clearForm();
    } else {
        alert("Ошибка добавления клиента");
    }
}

function updateRow(row, client) {
    row.cells[0].innerHTML = client.surname;
    row.cells[1].innerHTML = client.name;
    row.cells[2].innerHTML = client.patronomyc;
    row.cells[3].innerHTML = client.number;
    row.cells[4].innerHTML = client.date;
    row.cells[5].innerHTML = client.giver;
}

function validateForm() {
    const inputs = document.getElementsByClassName("validate");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length === 0) return false;
    }
    return true;
}

async function updateClient() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const client = getForm();
    const response = await fetch(`http://localhost:3000/client/${client.id}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(client), // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
        updateRow(document.getElementById(client.id), client);
        clearForm();
    } else {
        alert("Ошибка обновления клиента");
    }
}

async function deleteClient() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const client = getForm();
    const response = await fetch(`http://localhost:3000/client/${client.id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
    });
    if (response.status === 200) {
        document.getElementById(client.id).remove();
        clearForm();
    } else {
        alert("Ошибка удаления клиента");
    }
}

loadPage();
