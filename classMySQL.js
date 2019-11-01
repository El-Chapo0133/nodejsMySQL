/// Type        : JS
/// Author      : Loris Levêque
/// Date        : 1.11.2019
/// Description : Template for nodejs
///               for MySQL implement
///               class form
var DATABASE = {
    "host": "",
    "databaseName": "",
    "username": "",
    "password": ""
};
var MyDB = /** @class */ (function () {
    function MyDB() {
        this.mysql = require('mysql');
    }
    /** ########################################################### */
    /** Private functions */
    MyDB.prototype.log = function (message) {
        console.log("|-- ERROR");
        console.log("|--" + message);
        throw (message);
    };
    /// return :any, because i don't know the mysql class type :(
    MyDB.prototype.getConnector = function () {
        return this.mysql.createConnexion({
            host: DATABASE.host,
            database: DATABASE.databaseName,
            user: DATABASE.username,
            password: DATABASE.password
        });
    };
    /// <summary>
    /// connect the app to the database with the mysql connector
    /// </summary>
    MyDB.prototype.connect = function (connector) {
        var _this = this;
        try {
            connector.connect(function (err) {
                if (err) {
                    _this.log(err);
                }
                else {
                    /** the connexion's allright :) */
                }
            });
        }
        catch (ex) {
            this.log(ex);
        }
    };
    /** ########################################################### */
    /** Public functions */
    MyDB.prototype.startConnexion = function () {
        this.connect(this.getConnector());
    };
    MyDB.prototype.stopConnexion = function () {
    };
    MyDB.prototype.executeQuery = function (query) {
    };
    MyDB.prototype.getConnexionStatus = function () {
    };
    return MyDB;
}());
module.exports = new MyDB();
