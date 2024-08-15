export function SearchFunc(  obj : any  , filters?:any) {
    let  query : any = ''
    Object.keys(obj).forEach((a , index)=>{
      if(obj[a]) query += index == Object.keys(obj).length -1 ? `${a}=${obj[a]}` : `${a}=${obj[a]}&`;
    })
     if(filters)  return query + filters
     else return query
    }