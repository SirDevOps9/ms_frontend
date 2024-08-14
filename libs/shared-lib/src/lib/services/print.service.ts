import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor() {}



// print(id: string) {
//   const printableTable = document.getElementById(id);

//   if (printableTable) {
//     // Clone the printable table
//     const clonedTable = printableTable.cloneNode(true) as HTMLElement;

//     // Convert inputs to spans with their values in the cloned table
//     const inputs = clonedTable.querySelectorAll('input');
    
//     inputs.forEach(input => {
//       const span = document.createElement('span');
//       span.textContent = input.value;
//       span.style.display = 'inline-block';
//       span.style.width = input.style.width || '100%';
//       span.style.border = input.style.border;
//       span.style.padding = input.style.padding;
//       span.style.margin = input.style.margin;
//       span.style.boxSizing = input.style.boxSizing;
//       span.style.fontSize = input.style.fontSize;
//       span.style.fontFamily = input.style.fontFamily;
//       span.className = input.className;
//       input.parentNode?.replaceChild(span, input);
//     });

//     // Create a hidden div to hold the cloned table
//     const hiddenDiv = document.createElement('div');
//     hiddenDiv.style.display = 'none';
//     hiddenDiv.style.width = '100%'; ;
//     hiddenDiv.appendChild(clonedTable);
//     document.body.appendChild(hiddenDiv);

//     // Print the cloned table
//     const printContents = clonedTable.innerHTML;
//     const originalContents = document.body.innerHTML;

//     document.body.innerHTML = printContents;
//     window.print();
//     document.body.innerHTML = originalContents;

//     // Remove the hidden div after printing
//     document.body.removeChild(hiddenDiv);
//   } else {
//     console.log("Error: printable table not found");
//     window.location.reload();

//   }
//   window.location.reload();
// }
print(id: string) {
  const printableTable = document.getElementById(id);

  if (printableTable) {
    // Clone the printable table
    const clonedTable = printableTable.cloneNode(true) as HTMLElement;

    // Convert inputs to spans with their values in the cloned table
    const inputs = clonedTable.querySelectorAll('input');
    
    inputs.forEach(input => {
      const span = document.createElement('span');
      span.textContent = input.value;
      span.style.display = 'inline-block';
      span.style.width = input.style.width || '100%';
      span.style.border = input.style.border;
      span.style.padding = input.style.padding;
      span.style.margin = input.style.margin;
      span.style.boxSizing = input.style.boxSizing;
      span.style.fontSize = input.style.fontSize;
      span.style.fontFamily = input.style.fontFamily;
      span.className = input.className;
      input.parentNode?.replaceChild(span, input);
    });

    // Create a hidden div to hold the cloned table
    const hiddenDiv = document.createElement('div');
    hiddenDiv.style.display = 'none';
    hiddenDiv.style.width = '100%';
    hiddenDiv.appendChild(clonedTable);
    document.body.appendChild(hiddenDiv);

    // Save original contents and set up for printing
    const printContents = clonedTable.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    // Reload the page after printing or canceling
    window.onafterprint = () => {
      document.body.innerHTML = originalContents;
      window.location.reload();
    };

    // Trigger print
    window.print();

    // Remove the hidden div after printing
    document.body.removeChild(hiddenDiv);
  } else {
    console.log("Error: printable table not found");
    window.location.reload();
  }
}





}
