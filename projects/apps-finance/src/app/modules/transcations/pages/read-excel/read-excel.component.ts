import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { priceList } from '../../models';

@Component({
  selector: 'app-read-excel',
  templateUrl: './read-excel.component.html',
  styleUrl: './read-excel.component.scss',
})
export class ReadExcelComponent implements OnInit {
  listOfExcel: priceList[];
  ngOnInit(): void {}

  onclick() {
    console.log(this.data);

    const keys = ['code', 'name', 'uom', 'varient', 'price', 'vat'];

    const result = this.data.slice(1).map((arr) => {
      return keys.reduce((obj: any, key, index) => {
        obj[key] = arr[index];
        return obj;
      }, {});
    });

    console.log(result);
    this.listOfExcel = result;
    console.log(this.listOfExcel);
  }

  data: any[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'xlsx') {
        this.readExcelFile(file);
      } else {
        console.log('not supported');
      }
    }
  }

  readExcelFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.data = json;
    };
    reader.readAsBinaryString(file);
  }
}

/**
 *
 *
 *
 */
