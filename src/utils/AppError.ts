export class AppError{
     message: string
     statutsCode: number

     constructor(message: string, statutsCode: number = 400){
          this.message = message
          this.statutsCode = statutsCode
     }
}