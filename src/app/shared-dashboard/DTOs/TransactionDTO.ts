

export interface TransactionDTO{
  id:number;
  amount:number;
  date:any
  description:string;
  reference:string;
  serviceFee:number;
  destination:string;
  transactionType:string;
  accountNumber:string;
  pending:boolean;
  accountType:string;
}
