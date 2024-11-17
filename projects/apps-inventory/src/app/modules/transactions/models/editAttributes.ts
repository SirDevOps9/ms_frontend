export interface EditAttributes {
    id: number
    itemAttributeGroups: ItemAttributeGroup[]
  }
  
  export interface ItemAttributeGroup {
    id: number
    attributeGroupId: number
    isActive: boolean
    attributeGroupDetails: number[]
  }
  