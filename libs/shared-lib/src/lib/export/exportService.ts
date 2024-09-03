import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { lookupDto } from 'shared-lib';

export class ExportService {
  static async ToPDF(
    jsonData: any[],
    fileName: string,
    includeColumns: lookupDto[] = []
  ): Promise<void> {
    const doc = await addFontFromUrl('assets/fonts/poppins/cairo-regular.ttf', 'Cairo');
    let flattenData: any[];

    // Check if jsonData is in a tree structure and flatten if necessary
    if (this.isTreeStructure(jsonData)) {
      flattenData = this.flattenTree(jsonData);
    } else {
      flattenData = jsonData;
    }

    const filteredData = flattenData.map((row) => {
      const filteredRow: any = {};
      // if (includeColumns && includeColumns.length > 0) {
      //   for (const key in row) {
      //     if (
      //       row.hasOwnProperty(key) &&
      //       includeColumns
      //         .map((col) => col.name.toString().toLowerCase())
      //         .includes(key.toLowerCase())
      //     ) {
      //       filteredRow[key] = row[key];
      //     }
      //   }
      // } else {
      // Include all columns
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          if (row.hasOwnProperty(key) && key.toLowerCase() !== 'id') {
            filteredRow[key] = row[key];
          }
        }
      }
      //}
      return filteredRow;
    });

    // Extract headers dynamically from filtered data
    const headers = [Object.keys(filteredData[0])];

    // Generate table
    // Set document language to Arabic for RTL support
    doc.setLanguage('ar');

    // Generate table
    autoTable(doc, {
      head: headers,
      body: filteredData.map((item) => Object.values(item)),
      styles: { font: 'Cairo', halign: 'center' },
      didDrawCell: (data) => {
        doc.setFont('Cairo');
      },
    });

    doc.save(fileName);
  }

  static ToExcel(jsonData: any[], fileName: string, includeColumns: lookupDto[] = []): void {
    let flattenData: any[];


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
      // if (includeColumns && includeColumns.length > 0) {
      //   for (const key in row) {
      //     if (
      //       row.hasOwnProperty(key) &&
      //       includeColumns
      //         .map((col) => col.name.toString().toLowerCase())
      //         .includes(key.toLowerCase())
      //     ) {
      //       filteredRow[key] = row[key];
      //     }
      //   }
      // } else {
      // Include all columns except 'id'
      for (const key in row) {
        if (row.hasOwnProperty(key) && key.toLowerCase() !== 'id') {
          filteredRow[key] = row[key];
        }
      }
      // }
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
    if (jsonData === undefined || jsonData.length === 0) return false;
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
async function addFontFromUrl(
  url: string,
  fontName: string,
  style: string = 'normal'
): Promise<jsPDF> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const fontBlob = await response.blob();
    // Convert blob to base64
    const fontBase64 = await blobToBase64(fontBlob);
    const base64Data = fontBase64.split(',')[1]; // Extract base64 data from data URL

    const doc = new jsPDF();
    doc.addFileToVFS(`${fontName}.ttf`, base64Data);
    doc.addFont(`${fontName}.ttf`, fontName, style);
    doc.setFont(fontName);
    doc.setFontSize(12);

    return doc;
  } catch (error) {
    console.error('Error fetching or using font:', error);
    throw error;
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
