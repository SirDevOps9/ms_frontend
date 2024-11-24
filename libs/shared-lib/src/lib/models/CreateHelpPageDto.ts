import { EditHelpPageDetailsDto } from "./EditHelpPageDetailsDto";

export class CreateHelpPageDto {
    title: string;                
    isDraft: boolean;            
    publishStartDate: Date | null;  
    publishEndDate: Date | null;    
    sefName: string;              
    serviceId: number;          
    helpPageDetails: EditHelpPageDetailsDto;  
  }
  