class calculator {
    constructor(number) {
        this.number = number
    };
    setNumber() {
        console.log(this.number);
    };
};

for(let n of [0,1,2,3,4,5,6,7,8,9]) {
    const num = document.getElementById(Number(n)); 
    num.onclick = () => {
        const number = new calculator(n);
        number.setNumber();
    };
};