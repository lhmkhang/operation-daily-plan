import log4js from 'log4js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const config = {
    "appenders": {
        "console": { "type": "console" },
        "infoFile": {
            "type": "file",
            "filename": path.join(path.resolve(dirname(fileURLToPath(import.meta.url)), '..'), "Logs/info.log"),
            "maxLogSize": 10485760, // 10MB
            "backups": 3,
            "layout": {
                "type": "pattern",
                "pattern": "%d [%p] %h %m"
            },
            "level": "info"
        },
        "errorFile": {
            "type": "file",
            "filename": path.join(path.resolve(dirname(fileURLToPath(import.meta.url)), '..'), "Logs/error.log"),
            "maxLogSize": 10485760, // 10MB
            "backups": 3,
            "layout": {
                "type": "pattern",
                "pattern": "%d [%p] %h %m"
            },
            "level": "error"
        }
    },
    "categories": {
        "default": { "appenders": ["console"], "level": "debug" },
        "infoLogger": { "appenders": ["console", "infoFile"], "level": "info" },
        "errorLogger": { "appenders": ["console", "errorFile"], "level": "error" }
    }
}


const logger = log4js.configure(config);

export default logger;
