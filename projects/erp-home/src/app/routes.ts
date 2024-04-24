export const ERPRoutes = [
  {
    path: '',
   loadChildren:()=> 
   import('./modules/layout/layout.module').then((m)=>m.LayoutModule)
  },

];
