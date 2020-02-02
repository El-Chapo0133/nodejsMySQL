/// Type        : JS
/// Author      : Loris Levêque
/// Date        : 1.11.2019
/// Description : Template for nodejs
///               for MySQL implement
///               class form
///
///
/** Next step : change this to setup multiple database connection */
const DATABASE = {
    "host": "",
    "databaseName": "",
    "username": "",
    "password": "",
};

class MyDB {
    private mysql = require('mysql');
    private connector = null;
    /** Private functions */
    private log(message) :void {
        console.log(`|${Date.now()}`);
        console.log(`|- ${message}`);
    }
    /// return :any, because i don't know the mysql class type :(
    private async createConnector() :Promise<any> {
        if (this.isNull(this.connector)) {
            this.connector = this.mysql.createConnexion({
                host: DATABASE.host,
                database: DATABASE.databaseName,
                user: DATABASE.username,
                password: DATABASE.password
            })
            return this.connector;
        } else {
            this.log("connector already created");
            throw("connector already created");
        }
    }
    /// <summary>
    /// connect the app to the database with the mysql connector
    /// </summary>
    private connect():void {
        try {
            this.connector.connect((err) => {
                if (err) {
                    this.log(err);
                    throw(err);
                } else {
                    /** the connexion's allright :) */
                }
            })
        } catch (ex) {
            this.log(ex);
            throw(ex);
        }
    }
    private isConnexionOn(connector :any):boolean {
        if (connector.state === "connected") {
            return true;
        } else {
            return false;
        }
    }
    private isNull(input :any):boolean {
        if (input === null) {
            return true;
        } else {
            return false;
        }
    }
    private async executeQuery(query):Promise<any> {
        this.connector.query(query, (err, result) => {
            this.endQuery(err, result).then((result) => {
                return result;
            });
        });
    }
    private async endQuery(err, result):Promise<any> {
        if (err) {
            this.log(err);
            throw(err);
        } else {
            return result;
        }
    }
    /** Public functions */
    public async startConnexion() :Promise<void> {
        this.createConnector().then(() => {
            this.connect();
            return;
        });
    }
    public stopConnexion() :void {
        if (this.isNull(this.connector)) {
            this.log("connector is already [null]");
            throw("connector is already [null]");
        } else {
            this.connector = null;
        }
    }
    public async fullExecuteQuery(query):Promise<any> {
        if (!this.isNull(this.connector)) {
            this.executeQuery(query).then((result) => {
                if (result.length === 1) {
                    var dataFromDB = new DataFromDB();
                    dataFromDB.setAttributes(result[0]);
                    return dataFromDB;
                } else {
                    return result.map((data) => {
                        var dataFromDB = new DataFromDB();
                        dataFromDB.setAttributes(data);
                        return dataFromDB;
                    })
                }
            });
        } else {
            this.log("connector is [null]");
            throw("connector is already [null]");
        }
    }
    public getConnexionStatus() :string {
        if (this.isConnexionOn(this.connector)) {
            return String(this.connector.state);
        } else {
            return "connector not created/connected";
        }
    }
    public clone() :MyDB {
        var myDB = new MyDB;
        myDB.connector = this.connector;
        return myDB;
    }
    /// return true if closed nicely, return false if any error
    public close() :boolean {
        try {
            this.connector.end() //mysql function
            return true;
        } catch(ex) {
            this.log(ex);
            throw(ex);
        }
    }
}
class DataFromDB {
    private self = this;
    public timestamp :number;
    public constructor() {
        this.timestamp = Date.now(); //UNIX
    }
    public async setAttributes(args :object) :Promise<void> {
        const ARGS_NAMES :any[] = Object.keys(args);
        ARGS_NAMES.forEach((arg_name :string) => {
            this.addAttribute(arg_name, args[arg_name]);
        });
    }
    public cleanProperties() :void {
        const ARGS_NAMES :any[] = Object.keys(self);
        ARGS_NAMES.forEach((arg :any) => {
            if (this.checkAttribute(arg))
                delete self[arg];
        });
    }
    private async addAttribute(attr_name :string, attr_value :any) :Promise<void> {
        if (this.checkAttribute(attr_value)) {
            Object.defineProperty(self, attr_name, {
                get: () => {
                    return attr_value;
                }
            });
        }
    }
    private checkAttribute(input :any) {
        if (!this.isAFunction(input) && !this.isNull(input) && !this.isUndefined(input)) {
            return true;
        } else {
            return false;
        }
    }
    private isAFunction(input :any) :boolean {
        if (typeof(input) === "function") {
            return true;
        } else {
            return false;
        }
    }
    private isNull(input :any) :boolean {
        if (input === null) {
            return true;
        } else {
            return false;
        }
    }
    private isUndefined(input :any) :boolean {
        if (typeof(input) === "undefined") {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new MyDB();