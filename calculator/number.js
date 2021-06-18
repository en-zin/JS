let total = "";　//合計の処理
let number = 0;　//数字の処理で使用
let numberJson = [];
let stringCalc = "";
let pointNumber = 0.1; //小数の処理でしy
let pointFlag = false;
let calc = 0; //計算する変suu
const  add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const point = document.getElementById("point");
const minus = document.getElementById("minus");
const equal = document.getElementById("equal");
const allClear = document.getElementById("AC");
const clear = document.getElementById("C");
const back = document.getElementById("back")
//sevenSegmentここから
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let sevenSegmentTable = {　　　//７セグコード
    0 : [1,1,1,1,1,1,0,0,0],
    1 : [0,1,1,0,0,0,0,0,0],
    2 : [1,1,0,1,1,0,1,0,0],
    3 : [1,1,1,1,0,0,1,0,0],
    4 : [0,1,1,0,0,1,1,0,0],
    5 : [1,0,1,1,0,1,1,0,0],
    6 : [1,0,1,1,1,1,1,0,0],
    7 : [1,1,1,0,0,0,0,0,0],
    8 : [1,1,1,1,1,1,1,0,0],
    9 : [1,1,1,0,0,1,1,0,0],
};


//７セグwiki
// https://ja.wikipedia.org/wiki/7%E3%82%BB%E3%82%B0%E3%83%A1%E3%83%B3%E3%83%88%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4

let sevenSegment = (a,b,c,d,e,f,g,h,i,x) => {
    //A
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + a + ")";　//opacityの調整をどうするか？
    ctx.rect(135 - x ,24,10,2);  //引数持してrect()のx軸に引数を持たせると数字をずらせそう x軸 - 引数x
    ctx.fill();
   

    //B
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + b + ")";
    ctx.rect(145 - x,28,2,8);
    ctx.fill();


    //C
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + c + ")";
    ctx.rect(145 - x,40,2,8);
    ctx.fill();
 

    //D 
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + d + ")";
    ctx.rect(135 - x,50,10,2);
    ctx.fill();


    //E
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + e + ")";
    ctx.rect(133 - x,40,2,8);
    ctx.fill();
    
    //F
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + f + ")";
    ctx.rect(133 - x,28,2,8);
    ctx.fill();
   

    //G
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + g + ")";
    ctx.rect(135 - x,37,10,2);
    ctx.fill();

    //h //ドット
    ctx.beginPath () ;
    ctx.arc( 150 - x, 50, 2, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
    ctx.fillStyle = "rgba(255,0,0," + h + ")";
    ctx.strokeStyle = "rgb(252,21,21," + h + ")"
    ctx.fill() ;
    ctx.stroke();

    //マイナス表示
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0," + i + ")";　//opacityの調整をどうするか？
    ctx.rect(10,37,10,2);  //引数持してrect()のx軸に引数を持たせると数字をずらせそう x軸 - 引数x
    ctx.fill();
};

const start = ()  => {          //初期表示
    sevenSegment(...sevenSegmentTable[0],0);
}; //関数が実行されない

start();

const sum = () => {       //演算ボタンを押したときの処理
    if(calc == 0) {
        calc = number;
    } else if(total == "subtract") {
        calc = calc - number;
    } else if(total == "multiply") {
        calc = calc * number;
    } else if(total == "divide") {
        calc = calc / number;
    } else {
        calc = calc + number;
    };
    pointFlag = false;
    number = 0;
    pointNumber = 0.1;
    numberJson = [];
    console.log(calc);
};

allClear.onclick = () => {
    number = 0;
    numberJson = [];
    calc = 0;
    ctx.clearRect(0, 0, 200, 200);
    start();
};

clear.onclick = () => {
    number = 0;
    numberJson = [];
    ctx.clearRect(0, 0, 200, 200);
    start();
};

back.onclick = () => {
    numberJson.shift();
    ctx.clearRect(0, 0, 200, 200);
    console.log(numberJson)
    let x = 0;
    for(const sevenSegmentNmber of numberJson) {
        sevenSegment(...sevenSegmentTable[sevenSegmentNmber],(x));
        x = x + 20;
    };
};

point.onclick = () => {
    if(!pointFlag) {
        pointFlag = true;
        if(numberJson.length === 0) numberJson.unshift(0);
        let copySevenSegment = [...sevenSegmentTable[numberJson[0]]]; //７セグコードのコピーを作る
        let copyNumberJson = Number(numberJson[0] + 0.1);       //小数点を押す前に押した数字をコピーして0.1を足す
        copySevenSegment.splice(7,1,1); //コピーした７セグコードの７番目のセグを点灯状態にさせる
        numberJson.splice(0,1,copyNumberJson);　// 小数点を押す前に押した数字をcopyNumberJsonに置き換える
        sevenSegmentTable = {...sevenSegmentTable, [copyNumberJson] : copySevenSegment}; //sevenSegmentTableにkye [copyNumberJson] 配列 copySevenSegmentを代入
        let x = 0;
        for(const sevenSegmentNmber of numberJson) {
            sevenSegment(...sevenSegmentTable[sevenSegmentNmber],(x));
            x = x + 20;
        };
    };
};

minus.onclick = () => {
    ctx.clearRect(0, 0, 200, 200);
    if(Math.sign(number) == 1) {
        let copySevenSegment = [...sevenSegmentTable[numberJson[0]]]; //７セグコードのコピーを作る
        let copyNumberJson = Number(-(numberJson[0]));       //小数点を押す前に押した数字をコピーしてマイナスにする。
        copySevenSegment.splice(8,1,1); //コピーした７セグコードの8番目のセグを点灯状態にさせる
        numberJson.splice(0,1,copyNumberJson);　// 負を押す前に押した数字をcopyNumberJsonに置き換える
        sevenSegmentTable = {...sevenSegmentTable, [copyNumberJson] : copySevenSegment}; //sevenSegmentTableにkye [copyNumberJson] 配列 copySevenSegmentを代入
        number = number * -1;
    } else {
        let copyNumberJson = Number(-(numberJson[0]));       //正を押す前に押した数字をコピーしてプラスにする。
        numberJson.splice(0,1,copyNumberJson);　// 小数点を押す前に押した数字をcopyNumberJsonに置き換える
        number = number * -1
    };
    let x = 0;
    for(const sevenSegmentNmber of numberJson) {
        sevenSegment(...sevenSegmentTable[sevenSegmentNmber],(x));
        x = x + 20;
    };
    console.log(numberJson);
    console.log(sevenSegmentTable);
};

for(let n of [0,1,2,3,4,5,6,7,8,9]) {
    const num = document.getElementById(String(n)); 
    num.onclick = () => {
        ctx.clearRect(0, 0, 200, 200);   //キャンパスリセット
        numberJson.unshift(n);   //unshiftは配列の前にぶちこむ
        if(Math.sign(number) == -1) n = n * -1;
        console.log(n);
        if(pointFlag) {
            number = number + (pointNumber * n);
            pointNumber = pointNumber * 0.1;
        }else if(number == 0) {
            number = n;
        }else{
            number = number * 10 + n;
        };
        let x = 0;
        for(const sevenSegmentNmber of numberJson) {
            sevenSegment(...sevenSegmentTable[sevenSegmentNmber],(x)); //x軸を回すごとに20ずらす
            //...はスプレッド演算子配列を展開してくれる
            x = x + 20;
        };
    };
};


add.onclick = () => {
    sum();
    ctx.clearRect(0, 0, 200, 20);
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";　
    ctx.rect(115,10,14,2);  
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";　
    ctx.rect(121,4,2,14);  
    ctx.fill();
};

subtract.onclick = () => {
    sum();
    ctx.clearRect(0, 0, 200, 20);
    ///// 引き算点灯
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";　
    ctx.rect(133,10,14,2);  
    ctx.fill();
    /////
    total = "subtract";
};

multiply.onclick = () => {
    sum();
    ctx.clearRect(0, 0, 200, 20);
    /////////掛け算点灯
    ctx.beginPath();
    ctx.moveTo(85,7);
    ctx.lineTo(100,20);
    ctx.strokeStyle = "red";
    ctx.closePath();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(100,7);
    ctx.lineTo(85,20);
    ctx.strokeStyle = "red";
    ctx.closePath();
    ctx.stroke();
    //////////
    total = "multiply";
};

divide.onclick = () => {
    sum();
    ctx.clearRect(0, 0, 200, 20);
    /////////
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";　
    ctx.rect(63,10,12,2);  
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";　
    ctx.rect(67,5,5,2);  
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";　
    ctx.rect(67,15,5,2);  
    ctx.fill();
    ///////////
    total = "divide";
};

equal.onclick = () => {
    ctx.clearRect(0, 0, 200, 200);
    sum();
    if(Number.isInteger(calc)) {
        stringCalc = String(calc);              //calcを文字列にしてnumberjsonに一文字づつ分解して格納する
        for(i = 0; i < stringCalc.length; i++) {
            numberJson.unshift(stringCalc.charAt(i));
        };
    }else { 
        let copyCalc = Math.floor(calc);            //calcのコピーを小数点切り下げて生成
        let stringCopyCalc = String(copyCalc);      //文字列として取得,桁数をlengthで取得したいため
        let copyPointNumber = Number(stringCopyCalc.slice( -1 ));   //小数点前の数字を取得x.1  xの部分
        calc = Math.round(calc * 1000) / 1000;  //本物のcalcを小数点４桁にまとめる
        stringCalc = String(calc);              //calcを文字列にしてnumberjsonに一文字づつ分解して格納する ↓
        for(i = 0; i < stringCalc.length; i++) {
            numberJson.unshift(stringCalc.charAt(i));
        };                                      //                                                  ↑
        let copySevenSegment = [...sevenSegmentTable[copyPointNumber]];        //７セグコードのコピーを作る
        copySevenSegment.splice(7,1,1);                                 //コピーした７セグコードの７番目のセグを点灯状態にさせる
        numberJson.splice((-(stringCopyCalc.length)),1,copyPointNumber + 0.1);      //numberJsonの(stringCopyCalc.length)番目から二文字をcopyPointNumber + 0.1に変換させる
        numberJson = numberJson.filter(point => point !== ".");　　　　　// "."が残っているのでフィルターにかける
        sevenSegmentTable = {...sevenSegmentTable, [copyPointNumber + 0.1] : copySevenSegment};   //sevenSegmentTableにkye [copyPointNumber + 0.1] 配列 copySevenSegmentを代入
    };
    
    if(Math.sign(calc) == -1) {
        let copySevenSegment = [...sevenSegmentTable[Number(numberJson[0])]]; //７セグコードのコピーを作る
        let copyNumberJson = Number(-(numberJson[0]));       //小数点を押す前に押した数字をコピーしてマイナスにする。
        copySevenSegment.splice(8,1,1); //コピーした７セグコードの8番目のセグを点灯状態にさせる
        numberJson.splice(0,1,copyNumberJson);　// 小数点を押す前に押した数字をcopyNumberJsonに置き換える
        sevenSegmentTable = {...sevenSegmentTable, [copyNumberJson] : copySevenSegment}; //sevenSegmentTableにkye [copyNumberJson] 配列 copySevenSegmentを代入
        numberJson = numberJson.filter(point => point !== "-"); // "-"が残っているのでフィルターにかける
    };
    console.log(numberJson);
    let x = 0;
    for(const sevenSegmentNmber of numberJson.map(Number)) {    //配列の中身分for分で回して7セグを点灯させる
        sevenSegment(...sevenSegmentTable[sevenSegmentNmber],(x)); //x軸を回すごとに20ずらす
        x = x + 20;
    };
};




