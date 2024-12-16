
export interface HelpPagesList {
    serviceId: number
    serviceName: string
    hasHelpPage: boolean
    publish: boolean
    appName: string
  }
  
  export interface AddHelpPage {
    nameEn: string
    nameAr: string
    titleEn: string
    publishStartDate: string
    publishEndDate: string
    titleAr: string
    serviceId: number
    helpPageDetails: HelpPageDetails
  }
  
  export interface HelpPageDetails {
    contentEn: string
    contentAr: string
  }