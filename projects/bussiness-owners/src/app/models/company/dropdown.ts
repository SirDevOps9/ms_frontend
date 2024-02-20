export interface DropdownItemDto {
    id: number;
    name: string;
  }
  
  export  interface DropdownListDto {
    currencyDropdown: DropdownItemDto[];
    industryDropdown: DropdownItemDto[];
  }
  