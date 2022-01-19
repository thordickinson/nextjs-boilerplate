export enum Severity {
    TRACE, DEBUG, INFO, WARN, ERROR, FATAL
}

/**
 * Checks if current code is being executed inside the browser.
 */
export function isBrowser(): boolean{
    return typeof window !== 'undefined'
}

export interface Message {
    text: string
    icon?:string
    severity?: Severity
    arguments: {[key:string]: string | number | boolean }
}