async function getLeases() {
    const response = await fetch("http://localhost:3000/lease");
    const leases = await response.json();
    return leases;
}

async function getDeals() {
    const response = await fetch("http://localhost:3000/deal");
    const deals = await response.json();
    return deals;
}

async function getProducts() {
    const response = await fetch("http://localhost:3000/product");
    const products = await response.json();
    return products;
}

function cleanRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("hower");
    }
}

function fullfillForm(lease) {
    leaseForm.id = "r" + lease.id;
    document.getElementById("leaseId").innerHTML = `Сдача №${lease.id}`;
    leaseForm.leaseDate.value = lease.date;
    leaseForm.leaseProduct.value = lease.product;
    leaseForm.leaseDeal.value = lease.deal;
}

function getForm() {
    const lease = {
        id: leaseForm.id.substring(1),
        date: leaseForm.leaseDate.value,
        product: leaseForm.leaseProduct.value,
        productName:
            leaseForm.leaseProduct[leaseForm.leaseProduct.selectedIndex]
                .textContent,
        deal: leaseForm.leaseDeal.value,
        dealNumber:
            leaseForm.leaseDeal[leaseForm.leaseDeal.selectedIndex].textContent,
    };

    return lease;
}

function bindRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].onclick = (elem) => {
            cleanRows();
            let lease = {
                id: elem.path[1].id.substring(1),
                date: elem.path[1].cells[0].innerHTML,
                product: elem.path[1].cells[1].id,
                productName: elem.path[1].cells[1].innerHTML,
                deal: elem.path[1].cells[2].id,
                dealName: elem.path[1].cells[2].innerHTML,
            };
            fullfillForm(lease);
            rows[i].classList.add("hower");
        };
    }
}

async function loadTable() {
    const leases = await getLeases();
    document.querySelector("#tableBody tbody").innerHTML += leases
        .map((n, i) => {
            if (!document.getElementById("r" + n["Сдача в ломбард"])) {
                return `
    <tr id='r${n["Сдача в ломбард"]}' class='row'>
        <td>${n["Дата сдачи"].substring(0, 10)}</td>
        <td id='${n.Товар[0]}'>${n.Название}</td>
        <td id='${n.Договор[0]}'>${n["Номер договора"]}</td>
    </tr>
    `;
            }
        })
        .join("");

    const products = await getProducts();
    for (let i = 0; i < products.length; i++) {
        var el = document.createElement("option");
        el.textContent = products[i].Название[0];
        el.value = products[i]["Товар"];
        leaseForm.leaseProduct.appendChild(el);
    }

    const deals = await getDeals();
    for (let i = 0; i < deals.length; i++) {
        var el = document.createElement("option");
        el.textContent = deals[i]["Номер договора"];
        el.value = deals[i]["Договор"];
        leaseForm.leaseDeal.appendChild(el);
    }
}

async function loadPage() {
    await loadTable();
    bindRows();
}

function clearForm() {
    document.getElementById("leaseId").innerHTML = "Сдача №";

    leaseForm.id = "";
    leaseForm.leaseDate.value = "";
    leaseForm.leaseProduct.value = "";
    leaseForm.leaseDeal.value = "";
}

async function insertLease() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const lease = getForm();
    const response = await fetch("http://localhost:3000/lease", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(lease), // body data type must match "Content-Type" header
    });
    if (response.status === 200) {
        loadPage();
        clearForm();
    } else {
        alert("Ошибка добавления сдачи");
    }
}

function updateRow(row, lease) {
    console.log(row);
    console.log(lease);
    row.cells[0].innerHTML = lease.date;
    row.cells[1].id = lease.product;
    row.cells[1].innerHTML = lease.productName;
    row.cells[2].id = lease.deal;
    row.cells[2].innerHTML = lease.dealNumber;
}

function validateForm() {
    const inputs = document.getElementsByClassName("validate");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length === 0) return false;
    }
    return true;
}

async function updateLease() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const lease = getForm();
    const response = await fetch(`http://localhost:3000/lease/${lease.id}`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(lease), // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
        updateRow(document.getElementById("r" + lease.id), lease);
        clearForm();
    } else {
        alert("Ошибка обновления сдачи");
    }
}

async function deleteLease() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const lease = getForm();
    const response = await fetch(`http://localhost:3000/lease/${lease.id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
    });
    if (response.status === 200) {
        document.getElementById("r" + lease.id).remove();
        clearForm();
    } else {
        alert("Ошибка удаления сдачи");
    }
}

loadPage();
