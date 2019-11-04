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
    /** ########################################################### */
    /** Private functions */
    private log(message):void {
        console.log("|-- ERROR");
        console.log("|--" + message);
        throw(message);
    }
    /// return :any, because i don't know the mysql class type :(
    private createConnector(callback):any {
        if (this.isNull(this.connector)) {
            this.connector = this.mysql.createConnexion({
                host: DATABASE.host,
                database: DATABASE.databaseName,
                user: DATABASE.username,
                password: DATABASE.password
            })
            callback();
        } else {
            this.log("connector already created");
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
                } else {
                    /** the connexion's allright :) */
                }
            })
        } catch (ex) {
            this.log(ex);
        }
    }
    private isConnexionOn(connector):boolean {
        if (connector.state === "connected") {
            return true;
        } else {
            return false;
        }
    }
    private isNull(thing):boolean {
        if (thing == null) {
            return true;
        } else {
            return false;
        }
    }
    private executeQuery(query, callback):void {
        this.connector.query(query, (err, result) => {
            this.endQuery(err, result, callback);
        })
    }
    private endQuery(err, result, callback):void {
        if (err) {
            this.log(err);
        } else {
            callback(result);
        }
    }
    /** ########################################################### */
    /** Public functions */
    public startConnexion():void {
        this.createConnector(() => {
            this.connect();
        });
    }
    public stopConnexion():void {
        if (this.isNull(this.connector)) {
            this.log("connector is already [null]");
        } else {
            this.connector = null;
        }
    }
    public fullExecuteQuery(query, callback):void {
        if (this.isNull(this.connector)) {
            this.executeQuery(query, callback);
        } else {
            this.log("connector is [null]");
        }
    }
    public getConnexionStatus():string {
        if (this.isConnexionOn(this.connector)) {
            return String(this.connector.state);
        } else {
            return "connector not created/connected";
        }
    }
    public clone():MyDB {
        var myDB = this;
        return myDB;
    }
}
module.exports = new MyDB();