export function convertDate(key) {
  if(key){
    let date = new Date(key);
    let fullDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return fullDate
  }else{
    return null
  }


}
