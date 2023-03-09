import sql from "mssql";

// const product = {
//     id: productForm.id,
//     name: productForm.productName.value,
//     amount: productForm.productAmount.value,
//     category: productForm.productCategory.value,
//     cost: productForm.productCost.value,
// };

export async function getProducts(req, res) {
    const result =
        await sql.query`select * from Товары JOIN [Категории товаров] ON [Категории товаров].[Категория товаров] = Товары.[Категория товаров]`;
    const productsDB = result.recordset;
    const products = [];
    productsDB.forEach((elem) => {
        products.push({
            id: elem["Товар"],
            name: elem["Название"][0],
            amount: elem["Количество"],
            category: elem["Категория товаров"][0],
            categoryName: elem["Название"][1],
            cost: elem["Стоимость"],
        });
    });
    res.json(products);
}

export async function getProduct(req, res) {
    const result =
        await sql.query`select * from Товары where Товар = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addProduct(req, res) {
    try {
        await sql.query`insert Товары values (${req.body.name}, ${req.body.amount},
         ${req.body.cost}, ${req.body.category})`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function updateProduct(req, res) {
    try {
        console.log(req.body);
        const wait = await sql.query`update Товары
            set Название = ${req.body.name},
            Количество = ${req.body.amount},
            Стоимость = ${req.body.cost},
            [Категория товаров] = ${req.body.category}
            where Товар = ${req.body.id}`;
        console.log(wait);
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function deleteProduct(req, res) {
    try {
        await sql.query`delete СтараяИнфоОТоварах where Товар=${req.params.id}`;
        await sql.query`delete Товары where Товар=${req.params.id}`;
        res.status("200").end();
    } catch (error) {
        console.log(error);
        res.status("500").end();
    }
}
