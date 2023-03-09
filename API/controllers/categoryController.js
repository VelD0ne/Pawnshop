import sql from "mssql";

export async function getCategories(req, res) {
    const result = await sql.query`select * from [Категории товаров]`;
    const categoriesDB = result.recordset;
    const categories = [];
    categoriesDB.forEach((elem) => {
        categories.push({
            id: elem["Категория товаров"],
            name: elem["Название"],
        });
    });
    res.json(categories);
}

export async function getCategory(req, res) {
    const result =
        await sql.query`select * from [Категории товаров] where [Категория товаров] = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addCategory(req, res) {
    try {
        await sql.query`insert [Категории товаров] values (${req.body.name})`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function updateCategory(req, res) {
    try {
        await sql.query`update [Категории товаров]
            set Название = ${req.body.name}
            where [Категория товаров] = ${req.body.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function deleteCategory(req, res) {
    try {
        await sql.query`delete [Категории товаров] where [Категория товаров]=${req.params.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}
