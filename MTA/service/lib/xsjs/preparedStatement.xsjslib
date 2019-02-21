var oResultConstructor = $.import('xsjs', 'oResult').lib;

var lib = class PreparedStatement {
    static createPreparedInsertStatement(sTableName, oValueObject) {
        let oResult = new oResultConstructor();

        let sColumnList = '', sValueList = '';

        Object.keys(oValueObject).forEach(key => {
            sColumnList += `"${key}",`;
            oResult.aParams.push(key);

            sValueList += "?, ";
            oResult.aValues.push(oValueObject[key]);
        });

        $.trace.error("svalue " + sValueList);
        $.trace.error("scolumn: " + sColumnList);

        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -1);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${sTableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    }

    static createPreparedSelectStatement(sTableName, oValueObject) {
        //generate query
        let oResult = new oResultConstructor();

        if (!oValueObject){
            oResult.sql += 'SELECT * ';
        } else {
            oResult.sql += "SELECT ";
            oValueObject.keys.forEach((elem)=>{
                oResult.aParams.push(elem);
                oResult.sql += `${elem}, `;
            });
            oResult.sql.slice(-2);
        }

        oResult.sql += ` FROM "${sTableName}"`;

        return oResult;
    }

    static createPreparedDeleteStatement(sTableName, oConditionObject) {
        let oResult = new oResultConstructor();

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += ` "${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }
        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };
};