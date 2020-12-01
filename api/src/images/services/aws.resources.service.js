class awsResourcesService {
  constructor({
    config,
    aws,
  }) {
    this.config = config;
    this.aws = aws;
    this.credentials = new this.aws.SharedIniFileCredentials({profile: 'default'});
    this.aws.config.credentials = this.credentials;
    this.getS3 = this.getS3.bind(this);
    this.getMysqlConfig = this.getMysqlConfig.bind(this);
  }

  getS3() {
    const s3 = new this.aws.S3();
    return s3;
  }

  getMysqlConfig() {
    return {
      host: this.config.AWS_RDS_END_POINT_MYSQL,
      user: this.config.AWS_RDS_USERNAME_MYSQL,
      password: this.config.AWS_RDS_PASSWORD_MYSQL,
      port: this.config.AWS_RDS_PORT_MYSQL,
      database: this.config.AWS_RDS_MYSQL_DATABASE_NAME,
      connectTimeout: this.config.AWS_RDS_TIMEOUT_MYSQL,
    };
  }

}

module.exports = awsResourcesService