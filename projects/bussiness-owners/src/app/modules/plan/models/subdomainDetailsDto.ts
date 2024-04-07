export interface subdomainDetailsDto {
    subdomain: ResponseSubdomainListDto;
    subdomainApps: SubdomainAppDto[];
}

export interface ResponseSubdomainListDto{
    name: string;
    purchasingPaymentPeriod: string;
    validFrom: Date;
    validTo: Date;
}

export interface SubdomainAppDto{
    name: string;
    id:number;
    CategoryName:string;
}