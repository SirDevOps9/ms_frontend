import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor() {}
  print(id: string) {
    const printableTable = document.getElementById(id);

    if (printableTable) {
      // Clone the printable table
      const clonedTable = printableTable.cloneNode(true) as HTMLElement;

      // Convert inputs to spans with their values in the cloned table
      const inputs = clonedTable.querySelectorAll('input');
      inputs.forEach((input) => {
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

      // Create an invisible iframe to hold the cloned table for printing
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDocument = iframe.contentWindow?.document;
      if (iframeDocument) {
        // Write the cloned table into the iframe's document
        iframeDocument.open();
        iframeDocument.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { width: 100%; border-collapse: collapse; }
              table, th, td { border: 1px solid black; padding: 10px; }

              /* Page break rules */
              @media print {
                body, html {
                  height: auto;
                  zoom: 0.95; /* Scale down content if needed */
                }

                /* Ensure long tables or sections break onto new pages */
                table {
                  page-break-inside: auto;
                }
                tr {
                  page-break-inside: avoid;
                  page-break-after: auto;
                }
                thead {
                  display: table-header-group; /* Ensure headers are repeated on each page */
                }
                tfoot {
                  display: table-footer-group;
                }

                /* Page breaks for large content */
                .page-break {
                  page-break-before: always;
                }
              }

              /* Handle text overflow */
              td {
                word-break: break-word; /* Prevent wide text from overflowing */
                max-width: 200px; /* Set a max width for table cells */
                overflow: hidden;
                text-overflow: ellipsis;
              }
            </style>
          </head>
          <body>
            ${clonedTable.outerHTML}
          </body>
        </html>
      `);
        iframeDocument.close();
      }

      const iframeWindow = iframe.contentWindow;
      if (iframeWindow) {
        // Trigger print in the iframe window
        iframeWindow.focus();
        iframeWindow.print();

        // Clean up the iframe after printing
        iframeWindow.onafterprint = () => {
          document.body.removeChild(iframe);
        };
      }
    } else {
      console.log('Error: printable table not found');
    }
  }
}
