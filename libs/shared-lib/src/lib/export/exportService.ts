import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class ExportService {


  static ToPDF(jsonData: any[], fileName: string, includeColumns: string[] = []): void {
    const doc = new jsPDF();
    let flattenData: any[];
  
    // Check if jsonData is in a tree structure and flatten if necessary
    if (this.isTreeStructure(jsonData)) {
      flattenData = this.flattenTree(jsonData);
    } else {
      flattenData = jsonData;
    }
  
    const filteredData = flattenData.map((row) => {
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
  


  static ToExcel(jsonData: any[], fileName: string, includeColumns: string[] = []): void {
    let flattenData: any[];

    console.log(jsonData)

    if (this.isTreeStructure(jsonData)) {
      // Function to flatten the nested tree structure
      flattenData = this.flattenTree(jsonData);
    } else {
      // Use the jsonData directly (ordinary array)
      flattenData = jsonData;
    }

    // Apply filtering and prepare final data for export
    const filteredData = flattenData.map((row) => {
      const filteredRow: any = {};
      if (includeColumns && includeColumns.length > 0) {
        for (const key in row) {
          if (row.hasOwnProperty(key) && includeColumns.map(col => col.toLowerCase()).includes(key.toLowerCase())) {
            filteredRow[key] = row[key];
          }
        }
      } else {
        // Include all columns except 'id'
        for (const key in row) {
          if (row.hasOwnProperty(key) && key.toLowerCase() !== 'id') {
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

  // Helper function to check if jsonData is in tree structure
  private static isTreeStructure(jsonData: any[]): boolean {
    if (jsonData.length === 0) return false;
    const firstItem = jsonData[0];
    return firstItem.hasOwnProperty('data') && firstItem.hasOwnProperty('children');
  }

  // Helper function to recursively flatten the tree structure
  private static flattenTree(data: any[]): any[] {
    const result: any[] = [];

    function flatten(node: any) {
      result.push(node.data); // Add current node

      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => {
          flatten(child); // Recursively flatten children
        });
      }
    }

    // Start flattening from the root nodes
    data.forEach((node) => {
      flatten(node);
    });

    return result;
  }


}


