/// Type        : JS
/// Author      : Loris Levêque
/// Date        : 1.11.2019
/// Description : Template for nodejs
///               for MySQL implement
///               class form
///
///
/** Next step : change this to setup multiple database connection */
var DATABASE = {
    "host": "",
    "databaseName": "",
    "username": "",
    "password": ""
};
var MyDB = /** @class */ (function () {
    function MyDB() {
        this.mysql = require('mysql');
        this.connector = null;
    }
    /** ########################################################### */
    /** Private functions */
    MyDB.prototype.log = function (message) {
        console.log("|-- ERROR");
        console.log("|--" + message);
        throw (message);
    };
    /// return :any, because i don't know the mysql class type :(
    MyDB.prototype.createConnector = function (callback) {
        if (this.isNull(this.connector)) {
            this.connector = this.mysql.createConnexion({
                host: DATABASE.host,
                database: DATABASE.databaseName,
                user: DATABASE.username,
                password: DATABASE.password
            });
            callback();
        }
        else {
            this.log("connector already created");
        }
    };
    /// <summary>
    /// connect the app to the database with the mysql connector
    /// </summary>
    MyDB.prototype.connect = function () {
        var _this = this;
        try {
            this.connector.connect(function (err) {
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
    MyDB.prototype.isConnexionOn = function (connector) {
        return connector.state;
    };
    MyDB.prototype.isNull = function (thing) {
        if (thing == null) {
            return true;
        }
        else {
            return false;
        }
    };
    MyDB.prototype.executeQuery = function (query, callback) {
        var _this = this;
        this.connector.query(query, function (err, result) {
            _this.endQuery(err, result, callback);
        });
    };
    MyDB.prototype.endQuery = function (err, result, callback) {
        if (err) {
            this.log(err);
        }
        else {
            callback(result);
        }
    };
    /** ########################################################### */
    /** Public functions */
    MyDB.prototype.startConnexion = function () {
        var _this = this;
        this.createConnector(function () {
            _this.connect();
        });
    };
    MyDB.prototype.stopConnexion = function () {
        if (this.isNull(this.connector)) {
            this.log("connector is already [null]");
        }
        else {
            this.connector = null;
        }
    };
    MyDB.prototype.fullExecuteQuery = function (query, callback) {
        if (this.isNull(this.connector)) {
            this.executeQuery(query, callback);
        }
        else {
            this.log("connector is [null]");
        }
    };
    MyDB.prototype.getConnexionStatus = function () {
        if (this.isConnexionOn(this.connector)) {
            return String(this.connector.state);
        }
        else {
            return "connector not created/connected";
        }
    };
    MyDB.prototype.clone = function () {
        var myDB = this;
        return myDB;
    };
    return MyDB;
}());
module.exports = new MyDB();
