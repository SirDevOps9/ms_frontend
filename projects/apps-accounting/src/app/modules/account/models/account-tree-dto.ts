export interface accountTreeList {
    id: number;
    nameAr: string;
    nameEn: string;
    accountCode?: string;
    ParentId?: number;
    LevelId?: number;
    Childrens?: accountTreeList;
}