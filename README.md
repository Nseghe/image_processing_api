# IMAGE UPLOAD RESTFUL API

This api is written in node.js and is designed to handle image uploads. Uploaded images are physically stored in an AWS S3 bucket and corresponding image metadata (description, filetype and filesize) are stored in a MySql database hosted on AWS RDS.

## Before using

- Please make sure that you have:
  - [git](https://git-scm.com/downloads) installed.
  - [Docker](https://docs.docker.com/get-docker/) installed.
  - [Docker-compose](https://docs.docker.com/compose/install/) installed.
  - An [AWS account](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) (free tier is sufficient). You'll need to get your AWS credentials as explained [here](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html). You'll also need to set up an [AWS S3 bucket](https://aws.amazon.com/s3/) and an [AWS RDS MySql Database](https://aws.amazon.com/rds/mysql/). Since this is a hobby project, allow public access for both your S3 bucket and AWS RDS database so the api can communicate with them.
  - Update the credential file in the project directory (at ```/api/.aws/credentials```) with your AWS credentials (aws_access_key_id and aws_secret_access_key).
  - Update the config file in the project directory (at ```/api/src/config/env.config.js```) with the relevant parameters for your S3 bucket and AWS RDS MySql database. Also update the 'API_PORT' variable in the same file, with the port you'd like to run the API on (default is 8080).

## Usage

To run the project, please follow the steps below on a command line:
 - Clone the project repository by running "git clone https://github.com/Nseghe/Image_Processing_Api".
 - Navigate into the cloned project directory and run the following command: 
 ```
 docker-compose build && docker-compose up
 ```.