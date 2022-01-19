import { isBrowser } from "./commons"

export function setItem(key:string, value: string) {
    if(isBrowser()) localStorage.setItem(key, value)
}

export function getItem(key: string): string | undefined {
    if(isBrowser()) return localStorage.getItem(key)
    return undefined
}

export function clearItems(){
    if(isBrowser()) localStorage.clear()
}