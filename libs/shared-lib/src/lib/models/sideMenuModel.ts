export interface SideMenuModel {
  key: number;
  module: string;
  labelEn: string;
  labelAr: string;
  data: string;
  type: string;
  icon: string;
  moduleId:number;
  parentId?: number;
  children?: SideMenuModel[];
}
