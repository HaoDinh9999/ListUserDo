var str; 
var k;
var strCopy="10 15 3 7"
str = prompt("Nhap danh sach cac so (VD: 10 11 12) : ", "");
k = prompt("Nhap vao so k : ", "");
//Chuyen doi mang string qua number
str=str.split(" ").map((number)=>number*1);

const Check=(arr,k)=>{
   arr=arr.sort();
     for (let i = 0, j = arr.length - 1; i < j;) {
        let sum = arr[i] + arr[j];
        if (sum < k)
            i++;
        else if (sum > k)
            j--;
        else
            return true;
    }
    return false;
}
console.log(Check(str,k));
