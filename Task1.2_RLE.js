var str;
var strCopy = "PPPQRRRSTTQQS";
str = prompt("Ban hay nhap vao chuoi : ", "");
const arrayNumberData = (n) => {
  let count = 0;
  let arrNew = [];
  for (let i = 0; i < n.length; i++) {
    count++;
    if (n[i + 1] !== n[i]) {
      count === 1 ? (count = 0) : arrNew.push(count);
      arrNew.push(n[i]);
      count = 0;
    }
  }
  return arrNew.join("");
};
console.log(arrayNumberData(str));
