var str;
var strCopy = "webmaster";
str = prompt("Ban hay nhap vao chuoi: ", "");
const sortAlpha = (n) => {
  return n.split("").sort().join("");
};
console.log(sortAlpha(str));
