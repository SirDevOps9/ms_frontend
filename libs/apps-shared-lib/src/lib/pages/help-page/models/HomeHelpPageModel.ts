export interface HomeHelpPageModel {
  key: string;
  name: string;
  icon: string;
  moduleId: Number;
  module: string;
  type: string;
  hasHelpPage: boolean;
  serviceId: number;
  subMenu: HomeHelpPageModel[];
}
