export interface itemAttributeValues {
    id: number
    nameEn: string
    nameAr: string
    attributeGroupId: number
  }
  
  export interface itemAttributeValuesByID {
    id: number
    nameAr: string
    nameEn: string
    isActive: boolean
    itemAttributes: ItemAttribute[]
  }
  
  export interface ItemAttribute {
    id: number
    nameEn: string
    nameAr: string
    isActive: boolean
  }
  