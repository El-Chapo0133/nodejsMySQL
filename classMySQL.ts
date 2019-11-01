/// Type        : JS
/// Author      : Loris Levêque
/// Date        : 1.11.2019
/// Description : Template for nodejs
///               for MySQL implement
///               class form

const DATABASE = {
    "host": "",
    "databaseName": "",
    "username": "",
    "password": "",
};

class MyDB {
    private mysql = require('mysql');
    /** ########################################################### */
    /** Private functions */
    private log(message):void {
        console.log("|-- ERROR");
        console.log("|--" + message);
        throw(message);
    }
    /// return :any, because i don't know the mysql class type :(
    private getConnector():any {
        return this.mysql.createConnexion({
            host: DATABASE.host,
            database: DATABASE.databaseName,
            user: DATABASE.username,
            password: DATABASE.password
        })
    }
    /// <summary>
    /// connect the app to the database with the mysql connector
    /// </summary>
    private connect(connector):void {
        try {
            connector.connect((err) => {
                if (err) {
                    this.log(err)
                } else {
                    /** the connexion's allright :) */
                }
            })
        } catch (ex) {
            this.log(ex)
        }
    }
    /** ########################################################### */
    /** Public functions */
    public startConnexion():void {
        this.connect(this.getConnector())
    }
    public stopConnexion() {
        
    }
    public executeQuery(query):void {

    }
    public getConnexionStatus() {

    }
}
module.exports = new MyDB()