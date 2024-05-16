import { Subdomain } from "./subdomain"

export interface bussinesOwnerDetails {
    id: string
    name: string
    email: string
    countryNameEn: string
    countryNameAr: string
    phone: string
    isActive: boolean
    subdomains: Subdomain[]
  }
