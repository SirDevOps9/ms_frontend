export interface AttributesVariants {
    id: number
    attributeGroupId: number
    nameAr: string
    nameEn: string
    itemAttributeGroupDetails: ItemAttributeGroupDetail[]
    isActive: boolean
  }
  
  export interface ItemAttributeGroupDetail {
    attributeId: number
    nameAr: string
    nameEn: string
  }
  