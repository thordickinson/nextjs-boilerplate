//import * as slf4j from "log4js";


export function configure() {
    //const rootLogger = slf4j.getLogger();
    //rootLogger.level = "debug";
}

const loggers = {}

export function getLogger(name: string): Logger {
    let logger = loggers[name]
    if(!logger){
        logger = new NextJsLogger(name)
        loggers[name] = logger
    }
    return logger
}

function isBrowser(): boolean {
    return typeof window !== 'undefined'
}

export interface Logger {
    readonly name: string
    info(message: string): void
    error(message: string, error?: any): void
    debug(message: string): void
    warn(message: string, error?: any): void
}

class Log4JsLogger implements Logger {
    logger: any = undefined
    constructor(public readonly name: string){

    }
    getLogger(){
        if(!this.logger){
            //TODO: User slf4j in serverside logging
            this.logger = new  BrowserLogger(this.name)//slf4j.getLogger(this.name)
        }
        return this.logger
    }
    info(message: string): void {
        this.getLogger().info(message)
    }
    error(message: string, error?: any): void {
        this.getLogger().error(message, error)
    }
    debug(message: string): void {
        this.getLogger().debug(message)
    }
    warn(message: string, error?: any): void {
        this.getLogger().warn(message, error)
    }
}

class BrowserLogger implements Logger {
    constructor(public readonly name: string){

    }
    info(message: string): void {
        console.log(message)
    }
    error(message: string, error?: any): void {
        console.error(message)
        if(error) console.error(error)
    }
    debug(message: string): void {
        console.debug(message)
    }
    warn(message: string, error?: any): void {
        console.warn(message)
        if(error) console.warn(error)
    }

}

class NextJsLogger implements Logger {

    serverSideLogger: Logger = undefined
    clientSideLogger: Logger = undefined
    constructor(public readonly name: string) {
    }

    private getDelegate(): Logger {
        let logger: Logger = undefined
        if (isBrowser()) {
            if (!this.clientSideLogger) this.clientSideLogger = new BrowserLogger(this.name)
            logger = this.clientSideLogger
        } else {
            if (!this.serverSideLogger) this.serverSideLogger = new Log4JsLogger(this.name)
            logger = this.serverSideLogger
        }
        return logger
    }

    info(message: string): void {
        this.getDelegate().info(message)
    }
    error(message: string, error?: any): void {
        this.getDelegate().error(message, error)
    }
    debug(message: string): void {
        this.getDelegate().debug(message)
    }
    warn(message: string, error?: any): void {
        this.getDelegate().warn(message, error)
    }

}

