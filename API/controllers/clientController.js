import sql from "mssql";

export async function getClients(req, res) {
    const result = await sql.query`select * from Клиенты`;
    const clientsDB = result.recordset;
    const clients = [];
    clientsDB.forEach((elem) => {
        clients.push({
            id: elem.Клиент,
            name: elem["Имя"],
            surname: elem["Фамилия"],
            patronomyc: elem["Отчество"],
            giver: elem["Кем выдан паспорт"],
            date: elem["Дача выдачи паспорта"],
            number: elem["Номер паспорта"],
        });
    });
    res.json(clients);
}

export async function getClient(req, res) {
    const result =
        await sql.query`select * from Клиенты where Клиент = ${req.params.id}`;
    res.json(result.recordset);
}

export async function addClient(req, res) {
    try {
        await sql.query`insert Клиенты values (${req.body.surname}, ${req.body.name},
         ${req.body.patronomyc}, ${req.body.number}, ${req.body.date}, ${req.body.giver})`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function updateClient(req, res) {
    try {
        await sql.query`update Клиенты
            set Фамилия = ${req.body.surname},
            Имя = ${req.body.name},
            Отчество = ${req.body.patronomyc},
            [Дача выдачи паспорта] = ${req.body.date},
            [Кем выдан паспорт] = ${req.body.giver},
            [Номер паспорта] = ${req.body.number}
            where Клиент = ${req.body.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}

export async function deleteClient(req, res) {
    try {
        await sql.query`delete Клиенты where Клиент=${req.params.id}`;
        res.status("200").end();
    } catch {
        res.status("500").end();
    }
}
