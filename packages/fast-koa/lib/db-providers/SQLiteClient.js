class SQLiteClient {
  constructor(db) {
    this.db = db;
  }

  beginTransaction() {
    return this._exec('BEGIN TRANSACTION;');
  }

  commitTransaction() {
    return this._exec('COMMIT TRANSACTION;');
  }

  rollbackTransaction() {
    return this._exec('ROLLBACK TRANSACTION;');
  }

  executeQuery(sql, params) {
    return this._execute('all', sql, params);
  }

  executeNonQuery(sql, params) {
    return this._execute('run', sql, params).then(result => {
      return result.changes;
    });
  }

  executeScalar(sql, params) {
    return this._execute('get', sql, params);
  }

  executeInsert(sql, params) {
    return this._execute('run', sql, params).then(result => {
      return result.lastID;
    });
  }

  _execute(type, sql, params) {
    if (!sql) {
      throw new Error('SQL not found.');
    }
    return new Promise((resolve, reject) => {
      // Process dynamic sql param
      sql = sql.replace(/#[a-zA-Z0-9]+/g, (match, offset, source) => {
        return params[match.slice(1)] || '';
      });
      // Not allow surplus parameters, Need get the used parameter keys
      let sqlNeedParamKeys = (sql.match(/@[a-zA-Z0-9]+/g) || []).map(x => x.slice(1));
      params = params || {};
      let sqlParams = {};
      // Process parameters
      sqlNeedParamKeys.forEach(k => {
        sqlParams[`@${k}`] = params[k];
      });

      this.db[type](sql, sqlParams, function(err, row) {
        if (err) {
          return reject(err);
        }
        if (type === 'run') {
          row = {
            lastID: this.lastID,
            changes: this.changes
          };
        }
        resolve(row);
      });
    });
  }

  // Execute sql
  _exec(sql) {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }
}

module.exports = SQLiteClient;
