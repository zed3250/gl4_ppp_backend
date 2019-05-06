"use strict";
const Minio = require("minio");
const Env = use("Env");
const fs = require("fs");
const Helpers = use("Helpers");
/**
 * Minio Client
 */
const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: Env.get("MINIO_ACCESS_KEY"),
  secretKey: Env.get("MINIO_SECRET_KEY")
});
/**
 * Controller to create and get files from the minio server
 */
class DocumentController {

  randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

   async createDocument({ request }) {
    const file = request.file("file");
    const bucket = request.input("project") + "-" + request.input("process");
    const name = request.input("name");
    var random = randomString(6);
    random += ".pdf";
    await file.move(Helpers.tmpPath(), {
      name: random,
      overwrite: true
    });
    if (!file.moved()) {
      return file.error();
    }
    const path = Helpers.tmpPath(random);
    var fileStream = fs.createReadStream(path);

    minioClient.putObject(bucket, name, fileStream, function(err, etag) {
      if (err) return console.log(err, etag); // err should be null
    });

    fs.unlinkSync(path);
    return "File uploaded";
  }

  async getDocument({ params , response }) {
    const path = params.project + "-" + params.process;
    const name = params.document;
    var random = randomString(6);
    random += ".pdf";
    const tempPath = Helpers.tmpPath(random);

    minioClient.fGetObject(path, name, tempPath, function(err) {
      if (err) {
        return console.log(err);
      }
      
    })
    response.download(tempPath, name);
  }
  

}
module.exports = DocumentController;
