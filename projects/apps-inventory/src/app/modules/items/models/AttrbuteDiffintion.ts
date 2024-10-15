export interface IAttrributeDifinition {
    pageInfoResult: any
    orderBy: any
    orderByDesc: boolean
    result: IAttrributeDifinitionResult[]
  }
  

  
  export interface IAttrributeDifinitionResult {
    id: number
    nameAr: string
    nameEn: string
    isActive: boolean
    itemAttributes: IAttrributeDifinitionItemAttribute[]
  }
  
  export interface IAttrributeDifinitionItemAttribute {
    nameEn: string
    nameAr: string
  }
  
  export interface ItemAttributeDiffinitionList {
    id: number
    nameEn: string
    nameAr: string
    isActive: boolean
    attributeGroupId: number
  }
  
  export interface addAttributeDifintion {
    id?: number
    nameAr: string
    nameEn: string
    itemAttributeDtos: ItemAttributeDto[]
  }

  
  export interface ItemAttributeDto {
    id?: number
    nameEn: string
    nameAr: string
    isActive: boolean
  }