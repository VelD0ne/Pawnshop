async function getDeals() {
    const response = await fetch("http://localhost:3000/deal");
    const deals = await response.json();
    return deals;
}

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

function fullfillForm(deal) {
    dealForm.id = deal.id;
    document.getElementById("dealId").innerHTML = `Договор №${deal.id}`;
    dealForm.dealNumber.value = deal.number;
    dealForm.dealSum.value = deal.sum;
    dealForm.dealReturnDate.value = deal.returnDate;
    dealForm.dealRegistrationDate.value = deal.registrationDate;
    dealForm.dealClient.value = deal.client;
}

function getForm() {
    const deal = {
        id: dealForm.id,
        number: dealForm.dealNumber.value,
        sum: dealForm.dealSum.value,
        returnDate: dealForm.dealReturnDate.value,
        registrationDate: dealForm.dealRegistrationDate.value,
        client: dealForm.dealClient.value,
        clientName:
            dealForm.dealClient[dealForm.dealClient.selectedIndex].textContent,
    };
    return deal;
}

function bindRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].onclick = (elem) => {
            cleanRows();
            let deal = {
                id: elem.path[1].id.substring(1),
                number: elem.path[1].cells[0].innerHTML,
                sum: elem.path[1].cells[1].innerHTML,
                returnDate: elem.path[1].cells[2].innerHTML,
                registrationDate: elem.path[1].cells[3].innerHTML,
                client: elem.path[1].cells[4].id,
                clientName: elem.path[1].cells[4].innerHTML,
            };
            fullfillForm(deal);
            rows[i].classList.add("hower");
        };
    }
}

async function loadTable() {
    const deals = await getDeals();
    document.querySelector("#tableBody tbody").innerHTML += deals
        .map((n, i) => {
            if (!document.getElementById("r" + n.Договор)) {
                return `
    <tr id='r${n.Договор}' class='row'>
        <td>${n["Номер договора"]}</td>
        <td>${n["Комиссионные"]}</td>
        <td>${n["Дата возврата"].substring(0, 10)}</td>
        <td>${n["Дата регистрации"].substring(0, 10)}</td>
        <td id ='${n["Клиент"][0]}'>${n.Фамилия}</td>
    </tr>
    `;
            }
        })
        .join("");

    const clients = await getClients();
    for (let i = 0; i < clients.length; i++) {
        var el = document.createElement("option");
        el.textContent = clients[i].Фамилия;
        el.value = clients[i]["Клиент"];
        dealForm.dealClient.appendChild(el);
    }
}

async function loadPage() {
    await loadTable();
    bindRows();
}

function clearForm() {
    document.getElementById("dealId").innerHTML = "Договор №";

    dealForm.id = "";
    dealForm.dealNumber.value = "";
    dealForm.dealRegistrationDate.value = "";
    dealForm.dealReturnDate.value = "";
    dealForm.dealClient.value = "";
    dealForm.dealSum.value = "";
}

async function insertDeal() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const deal = getForm();
    const response = await fetch("http://localhost:3000/deal", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(deal), // body data type must match "Content-Type" header
    });
    if (response.status === 200) {
        loadPage();
        clearForm();
    } else {
        alert("Ошибка добавления договора");
    }
}

function updateRow(row, deal) {
    row.cells[0].innerHTML = deal.number;
    row.cells[1].innerHTML = deal.sum;
    row.cells[2].innerHTML = deal.returnDate;
    row.cells[3].innerHTML = deal.registrationDate;
    row.cells[4].id = deal.client;
    row.cells[4].innerHTML = deal.clientName;
}

function validateForm() {
    const inputs = document.getElementsByClassName("validate");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length === 0) return false;
    }
    return true;
}

async function updateDeal() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const deal = getForm();
    const response = await fetch(`http://localhost:3000/deal/${deal.id}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(deal), // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
        updateRow(document.getElementById("r" + deal.id), deal);
        clearForm();
    } else {
        alert("Ошибка обновления договора");
    }
}

async function deleteDeal() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const deal = getForm();
    const response = await fetch(`http://localhost:3000/deal/${deal.id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
    });
    if (response.status === 200) {
        document.getElementById("r" + deal.id).remove();
        clearForm();
    } else {
        alert("Ошибка удаления договора");
    }
}

loadPage();
