class databaseInitializationService {
  constructor({
    config
  }) {
    this.config = config;
    this.getRDSInitializationQueries = this.getRDSInitializationQueries.bind(this);
  }

  getRDSInitializationQueries() {
    const createTableQuery = `CREATE TABLE IF NOT EXISTS Images (
                                id            CHAR(36)   PRIMARY KEY,
                                description   CHAR(200)  NOT NULL,
                                filetype      CHAR(4)    NOT NULL,
                                fileSize      INTEGER    NOT NULL,
                                timeUploaded  TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP
                              )`;
    return createTableQuery;
  }

}

module.exports = databaseInitializationService;