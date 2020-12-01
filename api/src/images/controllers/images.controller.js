class imagesController {
  constructor({
    imagesModel
  }) {
    this.imagesModel = imagesModel;
    this.upload = this.upload.bind(this);
  }

  upload(req, res) {
    this.imagesModel.uploadImage(req, res).then((data) => {
      console.log(`Uploaded image ${data.Key} to s3 bucket`);
      this.imagesModel.uploadImageDetails(req, data).then(() => {
        console.log('Uploaded image details to RDS');
        return res.status(201).send({success: 'Image uploaded successfully'});
      }).catch((error) => {
        console.log('RDS error');
        this.imagesModel.deleteImage(data).then(() => {
          console.log(`Deleted image ${data.Key} from s3 bucket`);
          return res.status(500).send({error: `Unable to upload image details to RDS. Deleted image ${data.key} from S3 bucket. Please try again.`});
        }).catch((err) => {
          return res.status(500).send({error: `Unable to delete image ${data.key} from S3 bucket. Image ${data.key} should be deleted manually.`});
        })
      })
    }).catch((err) => {
      console.log('S3 error');
      return res.status(500).send({error: 'Unable to upload image to S3 bucket.\nPlease try again.'});
    })
  }

}

module.exports = imagesController;
