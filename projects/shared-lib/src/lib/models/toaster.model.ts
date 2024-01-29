import { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

export interface ToasterModel {
  title: string;
  message: string;
  toast?: boolean;
  icon?: SweetAlertIcon;
  position?: SweetAlertPosition;
}
