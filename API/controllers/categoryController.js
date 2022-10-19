import sql from "mssql";

export async function getCategories(req, res) {
    const result = await sql.query`select * from [Категории товаров]`;
    res.json(result.recordset);
}

export async function getCategory(req, res) {
    const result =
        await sql.query`select * from [Категории товаров] where [Категория товаров] = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addCategory(req, res) {
    try {
        await sql.query`insert [Категории товаров] values (${req.body.name})`;
        res.status("200").send("OK");
    } catch {
        res.status("500").send("error");
    }
}

export async function updateCategory(req, res) {
    try {
        await sql.query`update [Категории товаров]
            set Название = ${req.body.name}
            where [Категория товаров] = ${req.params.id}`;
        res.status("200").send("OK");
    } catch {
        res.status("500").send("error");
    }
}

export async function deleteCategory(req, res) {
    try {
        await sql.query`delete [Категории товаров] where [Категория товаров]=${req.params.id}`;
        res.status("200").send("OK");
    } catch {
        res.status("500").send("error");
    }
}
