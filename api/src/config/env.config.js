module.exports = {
  // API high-level specifications
  'API_PORT': 8080,
  'MAX_FILE_SIZE': 500*1024,
  'FILE_TYPES': /jpeg|jpg|png/,
  
  // AWS Configuration for S3 and RDS (MySQL)
  'AWS_BUCKET_NAME': 'crossover-project-nseghe-essiet',
  'AWS_RDS_END_POINT_MYSQL': 'crossover-project-nseghe-essiet-mysql-db.ccultzsfgpvp.eu-west-2.rds.amazonaws.com',
  'AWS_RDS_PORT_MYSQL': 3306,
  'AWS_RDS_USERNAME_MYSQL': 'admin',
  'AWS_RDS_PASSWORD_MYSQL': 'password',
  'AWS_RDS_MYSQL_DATABASE_NAME': 'crossover',
  'AWS_RDS_TIMEOUT_MYSQL': 60000,
};