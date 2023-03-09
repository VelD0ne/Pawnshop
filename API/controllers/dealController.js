import sql from "mssql";

export async function getDeals(req, res) {
    const result =
        await sql.query`select * from Договоры JOIN Клиенты ON Договоры.Клиент = Клиенты.Клиент`;
    const dealsDB = result.recordset;
    const deals = [];
    dealsDB.forEach((elem) => {
        deals.push({
            id: elem.Договор,
            number: elem["Номер договора"],
            sum: elem["Комиссионные"],
            returnDate: elem["Дата возврата"],
            registrationDate: elem["Дата регистрации"],
            client: elem["Клиент"][0],
            clientName: elem["Имя"],
        });
    });
    res.json(deals);
}

export async function getDeal(req, res) {
    const result =
        await sql.query`select * from Договоры where Договор = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addDeal(req, res) {
    try {
        await sql.query`insert Договоры values (${req.body.number}, ${req.body.sum},
         ${req.body.returnDate}, ${req.body.registrationDate}, ${req.body.client})`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function updateDeal(req, res) {
    try {
        await sql.query`update Договоры
            set [Номер договора] = ${req.body.number},
            Комиссионные = ${req.body.sum},
            [Дата возврата] = ${req.body.returnDate},
            [Дата регистрации] = ${req.body.registrationDate},
            Клиент = ${req.body.client}
            where Договор = ${req.body.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function deleteDeal(req, res) {
    try {
        await sql.query`delete Договоры where Договор=${req.params.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}
