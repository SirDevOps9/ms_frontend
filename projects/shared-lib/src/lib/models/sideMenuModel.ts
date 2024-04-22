export interface SideMenuModel {
  key: number;
  module: string;
  labelEn: string;
  labelAr: string;
  data: string;
  type: string;
  icon: string;
  parentId?: number;
  children?: SideMenuModel[];
}
