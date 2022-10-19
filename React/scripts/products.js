async function getproducts() {
    const response = await fetch("http://localhost:3000/product");
    const products = await response.json();
    return products;
}

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

function fullfillForm(product) {
    productForm.id = product.id;
    document.getElementById("productId").innerHTML = `Товар №${product.id}`;
    productForm.productName.value = product.name;
    productForm.productAmount.value = product.amount;
    productForm.productCategory.value = product.category;
    productForm.productCost.value = product.cost;
}

function getForm() {
    const product = {
        id: productForm.id,
        name: productForm.productName.value,
        amount: productForm.productAmount.value,
        category: productForm.productCategory.value,
        categoryName:
            productForm.productCategory[
                productForm.productCategory.selectedIndex
            ].textContent,
        cost: productForm.productCost.value,
    };
    return product;
}

function bindRows() {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
        rows[i].onclick = (elem) => {
            cleanRows();
            let product = {
                id: elem.path[1].id.substring(1),
                name: elem.path[1].cells[0].innerHTML,
                amount: elem.path[1].cells[1].innerHTML,
                category: elem.path[1].cells[2].id,
                categoryName: elem.path[1].cells[2].innerHTML,
                cost: elem.path[1].cells[3].innerHTML,
            };
            fullfillForm(product);
            rows[i].classList.add("hower");
        };
    }
}

async function loadTable() {
    const products = await getproducts();
    document.querySelector("#tableBody tbody").innerHTML += products
        .map((n) => {
            if (!document.getElementById("r" + n.Товар)) {
                return `
    <tr id='r${n.Товар}' class='row'>
        <td>${n.Название[0]}</td>
        <td>${n.Количество}</td>
        <td id='${n["Категория товаров"][0]}'>${n["Название"][1]}</td>
        <td>${n.Стоимость}</td>
    </tr>
    `;
            }
        })
        .join("");
    const categories = await getCategories();
    for (let i = 0; i < categories.length; i++) {
        var el = document.createElement("option");
        el.textContent = categories[i].Название;
        el.value = categories[i]["Категория товаров"];
        productForm.productCategory.appendChild(el);
    }
}

async function loadPage() {
    await loadTable();
    bindRows();
}

function clearForm() {
    productForm.id = "";
    document.getElementById("productId").innerHTML = "Товар №";

    productForm.productName.value = "";
    productForm.productAmount.value = "";
    productForm.productCategory.value = "";
    productForm.productCost.value = "";
}

function validateForm() {
    const inputs = document.getElementsByClassName("validate");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length === 0) return false;
    }
    return true;
}

async function insertProduct() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const product = getForm();
    const response = await fetch("http://localhost:3000/product", {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(product), // body data type must match "Content-Type" header
    });
    if (response.status === 200) {
        loadPage();
        clearForm();
    } else {
        alert("Ошибка добавления продукта");
    }
}

function updateRow(row, product) {
    row.cells[0].innerHTML = product.name;
    row.cells[1].innerHTML = product.amount;
    row.cells[2].id = product.category;
    row.cells[2].innerHTML = product.categoryName;
    row.cells[3].innerHTML = product.cost;
}

async function updateProduct() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const product = getForm();
    const response = await fetch(
        `http://localhost:3000/product/${product.id}`,
        {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(product), // body data type must match "Content-Type" header
        }
    );

    if (response.status === 200) {
        console.log(product.id);

        updateRow(document.getElementById("r" + product.id), product);
        clearForm();
    } else {
        alert("Ошибка обновления продукта");
    }
}

async function deleteProduct() {
    if (!validateForm()) {
        alert("Заполните форму");
        return;
    }
    const product = getForm();
    const response = await fetch(
        `http://localhost:3000/product/${product.id}`,
        {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        }
    );
    if (response.status === 200) {
        document.getElementById("r" + product.id).remove();
        clearForm();
    } else {
        alert("Ошибка удаления продукта");
    }
}

loadPage();
