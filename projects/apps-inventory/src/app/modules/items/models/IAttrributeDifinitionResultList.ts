interface TableData {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  itemAttributes: ItemAttribute[]; // Array of ItemAttribute objects
}

interface ItemAttribute {
  nameEn: string;
  nameAr: string;
}
