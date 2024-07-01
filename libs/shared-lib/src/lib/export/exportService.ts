import * as XLSX from 'xlsx';

export class ExcelExportService {


  static exportToExcel(jsonData: any[], fileName: string , includeColumns: string[] = []): void {

    const filteredData = jsonData.map((row) => {
        const filteredRow: any = {};
        for (const key in row) {
          if (row.hasOwnProperty(key) && includeColumns.map(col => col.toLowerCase()).includes(key.toLowerCase())) {
            filteredRow[key] = row[key];
          }
        }
        return filteredRow;
      });
    // Convert the JSON data to a worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);

    // Generate a new workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Save the workbook to a file
    XLSX.writeFile(wb, fileName);
  }
}
