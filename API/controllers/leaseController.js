import sql from "mssql";

export async function getLeases(req, res) {
    const result = await sql.query`select * from [Сдачи в ломбард]
    JOIN Договоры ON [Сдачи в ломбард].Договор = [Договоры].Договор
    JOIN Товары ON [Сдачи в ломбард].Товар = Товары.Товар`;
    const leasesDB = result.recordset;
    const leases = [];
    leasesDB.forEach((elem) => {
        leases.push({
            id: elem["Сдача в ломбард"],
            date: elem["Дата сдачи"],
            product: elem["Товар"][0],
            productName: elem["Название"],
            deal: elem["Договор"][0],
            dealName: elem["Номер договора"],
        });
    });
    res.json(leases);
}

export async function getLease(req, res) {
    const result =
        await sql.query`select * from [Сдачи в ломбард] where [Сдача в ломбард] = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addLease(req, res) {
    try {
        await sql.query`insert [Сдачи в ломбард] values (${req.body.date}, ${req.body.product},
         ${req.body.deal})`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function updateLease(req, res) {
    try {
        console.log(req.body);
        await sql.query`update [Сдачи в ломбард]
            set [Дата сдачи] = ${req.body.date},
            Товар = ${req.body.product},
            Договор = ${req.body.deal}
            where [Сдача в ломбард] = ${req.body.id}`;
        res.status("200").end();
    } catch (error) {
        console.log(error);
        res.status("500").end();
    }
}

export async function deleteLease(req, res) {
    try {
        await sql.query`delete [Сдачи в ломбард] where [Сдача в ломбард]=${req.params.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}
