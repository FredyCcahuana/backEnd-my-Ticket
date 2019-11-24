//una variable mas a express
declare namespace Express {
    export interface Request {
        userId: string;
    }
}