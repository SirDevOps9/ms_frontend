import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { BaseDto } from "shared-lib";

@Component({
    template: `
    Select Subdomain: <br>
    <!-- <select [(ngModel)]="selectedSubdomain">
        <option></option>
        <option *ngFor="let item of allSubdomains" [value]="item.id">{{item.name}}</option>
    </select> -->
    <button (click)="submit()">Submit</button>`,
})
export class SelectSubdomainComponent implements OnInit {

    selectedSubdomain: number;
    allSubdomains: BaseDto[];
    constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

    }

    ngOnInit(): void {
        this.allSubdomains = this.config.data.subdomains;
        console.log(this.config.data);
        console.log(this.config.header);
    }

    submit() {
        this.ref.close(this.selectedSubdomain);
    }
}