export enum Severity {
    TRACE, DEBUG, INFO, WARN, ERROR, FATAL
}


export interface Message {
    text: string
    icon?:string
    severity?: Severity
    arguments: {[key:string]: string | number | boolean }
}