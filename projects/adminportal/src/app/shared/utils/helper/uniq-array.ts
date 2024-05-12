export const uniqueArr = (arr: any[]) => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};
