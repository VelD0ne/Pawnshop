import sql from "mssql";

export async function getReport(req, res) {
    try {
        const command =
            "exec СредняяСуммаПоКатегорииЗаПромежуток " +
            "" +
            req.query.firstDate +
            "" +
            ", " +
            req.query.secondDate +
            "";
        const result = await sql.query(command);
        const reportDB = result.recordset;
        const report = [];
        reportDB.forEach((elem) => {
            report.push({
                categoryName: elem["Название"],
                average: elem["СредняяСумма"],
            });
        });
        console.log(command);
        console.log(report);
        res.json(report);
    } catch {}
}
