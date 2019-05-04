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
  async createDocument({ request }) {
    const file = request.file("file");
    const bucket = request.input("project") + "-" + request.input("process");
    const name = request.input("name");
    await file.move(Helpers.tmpPath(), {
      name: "temp.pdf",
      overwrite: true
    });
    if (!file.moved()) {
      return file.error();
    }
    const path = Helpers.tmpPath("temp.pdf");
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
    const tempPath = Helpers.tmpPath("temp.pdf");

    minioClient.fGetObject(path, name, tempPath, function(err) {
      if (err) {
        return console.log(err);
      }
      
    })
    response.download(tempPath);
  }
  

}
module.exports = DocumentController;
