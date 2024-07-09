import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class ExportService {

  static ToExcel(jsonData: any[], fileName: string, includeColumns: string[] = []): void {
    const filteredData = jsonData.map((row) => {
      const filteredRow: any = {};
      if (includeColumns && includeColumns.length > 0) {
        for (const key in row) {
          if (row.hasOwnProperty(key) && includeColumns.map(col => col.toLowerCase()).includes(key.toLowerCase())) {
            filteredRow[key] = row[key];
          }
        }
      } else {
        // Include all columns
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            filteredRow[key] = row[key];
          }
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
  
  static ToPDF(jsonData: any[], fileName: string, includeColumns: string[] = []): void {
    const doc = new jsPDF();
  
    const filteredData = jsonData.map((row) => {
      const filteredRow: any = {};
      if (includeColumns && includeColumns.length > 0) {
        for (const key in row) {
          if (row.hasOwnProperty(key) && includeColumns.map(col => col.toLowerCase()).includes(key.toLowerCase())) {
            filteredRow[key] = row[key];
          }
        }
      } else {
        // Include all columns
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            filteredRow[key] = row[key];
          }
        }
      }
      return filteredRow;
    });
  
    // Extract headers dynamically from filtered data
    const headers = [Object.keys(filteredData[0])];
  
    // Generate table
    autoTable(doc, {
      head: headers,
      body: filteredData.map(item => Object.values(item))
    });
  
    doc.save(fileName);
  }
}
