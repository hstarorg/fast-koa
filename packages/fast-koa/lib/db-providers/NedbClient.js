class NedbClient {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  /**
   * Add document
   * @param {any|array} doc
   */
  insert(doc) {
    return new Promise((resolve, reject) => {
      this.dataStore.insert(doc, (err, newDocs) => {
        if (err) return reject(err);
        resolve(newDocs);
      });
    });
  }

  /**
   * Query data list, include paging
   * @param {any} filterObj Query filter object
   * @param {any} fieldsObj Query field, default: all
   * @param {any} sortObj Sort object
   * @param {{pageSize: number, pageIndex: number}} pageObj Paging object{pageSize:Number.MAX_SAFE_INTEGER, pageIndex:1}
   */
  find(filterObj, fieldsObj, sortObj = {}, pageObj = { pageIndex: 1, pageSize: Number.MAX_SAFE_INTEGER }) {
    return new Promise((resolve, reject) => {
      this.dataStore
        .find(filterObj, fieldsObj || {})
        .sort(sortObj || {})
        .skip(pageObj.pageSize * (pageObj.pageIndex - 1))
        .limit(pageObj.pageSize)
        .exec((err, docs) => {
          if (err) return reject(err);
          resolve(docs);
        });
    });
  }

  /**
   * Find one doc
   * @param {any} filterObj Query filter object
   * @param {any} fieldsObj Query fields, default: all
   */
  findOne(filterObj, fieldsObj = {}) {
    return new Promise((resolve, reject) => {
      this.dataStore.findOne(filterObj, fieldsObj, (err, doc) => {
        if (err) return reject(err);
        resolve(doc);
      });
    });
  }

  /**
   * Update document
   * @param {any} filterObj
   * @param {any} updatedObj
   * @param {any} options
   */
  update(filterObj, updatedObj, options) {
    return new Promise((resolve, reject) => {
      this.dataStore.update(filterObj, updatedObj, options || {}, (err, numReplaced) => {
        if (err) {
          return reject(err);
        }
        resolve(numReplaced);
      });
    });
  }

  /**
   * Remove document
   * @param {any} filterObj Filter object
   * @param {boolean} allowMulti  Allow remove multi, default: false
   */
  remove(filterObj, allowMulti = false) {
    return new Promise((resolve, reject) => {
      this.dataStore.remove(filterObj, { multi: allowMulti }, (err, numRemoved) => {
        if (err) return reject(err);
        resolve(numRemoved);
      });
    });
  }

  /**
   * Get total count in datastore
   * @param {any} filterObj Filter object
   */
  count(filterObj) {
    return new Promise((resolve, reject) => {
      this.dataStore.count(filterObj, (err, count) => {
        if (err) return reject(err);
        resolve(count);
      });
    });
  }
}

module.exports = NedbClient;
