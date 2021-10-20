import { getLogger } from "log4js";


export function configure(){
    const rootLogger = getLogger();
    rootLogger.level = "debug";
}

