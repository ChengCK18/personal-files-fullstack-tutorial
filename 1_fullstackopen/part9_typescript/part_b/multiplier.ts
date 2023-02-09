type Operation = 'add' | 'multiply' | 'divide';
type testType = string | number;


// const multiplier = (a:number,b:number,printText:string) =>{
//     console.log(printText, a*b);

// }

// multiplier(2,4,'Ya multiplication, => ');

// multiplier('string ',4,'eh string, => ');


const calculator = (a:number,b:number,op:Operation):number =>{
   switch(op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error('Can\'t divide by 0!');
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
   }
}


// calculator(1,2,'not valid op')
// calculator(1,2,'add')
try {
    console.log(calculator(1, 5 , 'divide'));
}
catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}