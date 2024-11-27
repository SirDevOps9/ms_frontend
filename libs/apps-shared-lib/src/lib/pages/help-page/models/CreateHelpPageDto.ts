import { EditHelpPageDetailsDto } from "./EditHelpPageDetailsDto";

export class CreateHelpPageDto {
    titleEn: string;                
    titleAr: string;              
    publishStartDate: Date | null;  
    publishEndDate: Date | null;    
    serviceId: number;          
    helpPageDetails: EditHelpPageDetailsDto;  
  }
  