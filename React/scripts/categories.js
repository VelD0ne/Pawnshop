async function getCategories() {
    const response = await fetch("http://localhost:3000/category");
    const categorys = await response.json();
    return categorys;
}

function cleanRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].classList.remove("hower");
    }
}

function fullfillForm(category) {
    categoryForm.id = category.id;
    document.getElementById(
        "categoryId"
    ).innerHTML = `Категория №${category.id}`;
    categoryForm.categoryName.value = category.name;
}

function getForm() {
    const category = {
        id: categoryForm.id,
        name: categoryForm.categoryName.value,
    };
    return category;
}

function bindRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].onclick = (elem) => {
            cleanRows();
            let category = {
                id: elem.path[1].id,
                name: elem.path[1].cells[0].innerHTML,
            };
            fullfillForm(category);
            rows[i].classList.add("hower");
        };
    }
}

async function loadTable() {
    const categories = await getCategories();
    document.querySelector("#tableBody tbody").innerHTML += categories
        .map((n, i) => {
            if (!document.getElementById(n["Категория товаров"])) {
                return `
    <tr id='${n["Категория товаров"]}' class='row'>
        <td>${n.Название}</td>
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
    categoryForm.id = "";
    document.getElementById("categoryId").innerHTML = "Категория №";
    categoryForm.categoryName.value = "";
}

async function insertCategory() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const category = getForm();
    const response = await fetch("http://localhost:3000/category", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(category), // body data type must match "Content-Type" header
    });
    if (response.status === 200) {
        loadPage();
        clearForm();
    } else {
        alert("Ошибка добавления категории");
    }
}

function updateRow(row, category) {
    row.cells[0].innerHTML = category.name;
}

function validateForm() {
    const inputs = document.getElementsByClassName("validate");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length === 0) return false;
    }
    return true;
}

async function updateCategory() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const category = getForm();
    const response = await fetch(
        `http://localhost:3000/category/${category.id}`,
        {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(category), // body data type must match "Content-Type" header
        }
    );

    if (response.status === 200) {
        updateRow(document.getElementById(category.id), category);
        clearForm();
    } else {
        alert("Ошибка обновления категории");
    }
}

async function deleteCategory() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const category = getForm();
    const response = await fetch(
        `http://localhost:3000/category/${category.id}`,
        {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        }
    );
    if (response.status === 200) {
        document.getElementById(category.id).remove();
        clearForm();
    } else {
        alert("Ошибка удаления категории");
    }
}

loadPage();
