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
    res.json(result.recordset);
}

export async function getProduct(req, res) {
    const result =
        await sql.query`select * from Товары where Товар = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addProduct(req, res) {
    try {
        await sql.query`insert Товары values (${req.body.name}, ${req.body.amount},
         ${req.body.category}, ${req.body.cost})`;
        res.status("200").send("OK");
    } catch {
        res.status("500").send("error");
    }
}

export async function updateProduct(req, res) {
    try {
        await sql.query`update Товары
            set Название = ${req.body.name},
            Количество = ${req.body.amount},
            [Категория товаров] = ${req.body.category},
            Стоимость = ${req.body.cost}
            where Товар = ${req.params.id}`;
        res.status("200").send("OK");
    } catch {
        res.status("500").send("error");
    }
}

export async function deleteProduct(req, res) {
    try {
        await sql.query`delete СтараяИнфоОТоварах where Товар=${req.params.id}`;
        await sql.query`delete Товары where Товар=${req.params.id}`;
        res.status("200").send("OK");
    } catch (error) {
        console.log(error);
        res.status("500").send("error");
    }
}
