
export interface HelpPagesList {
    serviceId: number
    serviceName: string
    hasHelpPage: boolean
    appName: string
  }
  
  export interface AddHelpPage {
    title: string
    isDraft: boolean
    publishStartDate: string
    publishEndDate: string
    sefName: string
    serviceId: number
    helpPageDetails: HelpPageDetails
  }
  
  export interface HelpPageDetails {
    content: string
    description: string
  }