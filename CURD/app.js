let a=23;
let b="wer";
let c=a+b;
console.log(c);

let a1=["cecille","line"];
let b1=["dschsh","dhh"];
let c1=a1.concat(b1);
console.log(c1);

var myObj = { "name":"John", "age":31, "city":"New York" };
var myJSON = JSON.stringify(myObj);
console.log("demo_json.php?x=" + myJSON);

var obj=JSON.parse('{"firstName":"sabari","lastName":"krish"}');
console.log(obj.firstName+obj.lastName);

console.log(Boolean(10>9));

Boolean.prototype.myColor=function(){
    if(this.valueOf()==true){
        return "red";
    }
    else{
        return "yellow";
    }
};
let q=true;
console.log(q.myColor);

let bool=false;
console.log(bool.valueOf());

console.log(new Date());

