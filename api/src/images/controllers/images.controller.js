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
          return res.status(500).send({error: error + "\n" + error.stack});
        }).catch((err) => {
          return res.status(500).send({err: err + "\n" + err.stack});
        })
      })
    }).catch((err) => {
      console.log('S3 error');
      return res.status(500).send({error: err + "\n" + err.stack});
    })
  }

}

module.exports = imagesController;
