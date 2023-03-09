import sql from "mssql";

export async function getAllTables(req, res) {
    const result = await sql.query`select * from ВСЁ`;
    const allDB = result.recordset;
    const allTables = [];
    allDB.forEach((elem) => {
        allTables.push({
            clientName: elem["Имя"],
            surname: elem["Фамилия"],
            giver: elem["Кем выдан паспорт"],
            giveDate: elem["Дача выдачи паспорта"],
            passportNumber: elem["Номер паспорта"],
            dealNumber: elem["Номер договора"],
            sum: elem["Комиссионные"],
            returnDate: elem["Дата возврата"],
            leaseDate: elem["Дата сдачи"],
            productName: elem["Название"],
            categoryName: elem["Категория"],
            cost: elem["Стоимость"],
            amount: elem["Количество"],
        });
    });
    res.json(allTables);
}
