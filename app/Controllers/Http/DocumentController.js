"use strict";
const Minio = require("minio");
const Env = use("Env");
const Fs = require("fs");
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
  async createDocument({ request, response }) {
    const file = request.file("file");
    const bucket = request.input("project") + "-" + request.input("process");
    await file.move(Helpers.tmpPath(), {
      name: "temp.pdf",
      overwrite: true
    });
    if (!file.moved()) {
      return file.error();
    }
    const path = Helpers.tmpPath('temp.pdf');
    var fileStream = Fs.createReadStream(path);

    minioClient.putObject(
      bucket,
      file.fileName,
      fileStream,
      function(err, etag) {
          if (err)
            return console.log(err, etag); // err should be null
      }
    );

    Fs.unlinkSync(path);
    return "File uploaded";
  }
}
module.exports = DocumentController;
