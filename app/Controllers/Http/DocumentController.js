'use strict';
var Minio = require('minio');
const Env = use('Env');
/**
 * Minio Client
 */
const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: Env.get('MINIO_ACCESS_KEY'),
    secretKey: Env.get('MINIO_SECRET_KEY'),
});
/**
 * Controller to create and get files from the minio server
 */
class DocumentController {

    createFolder() {

        minioClient.makeBucket('europetrip', 'us-east-1', function (err) {
            if (err) return console.log(err)
            console.log('Bucket created successfully in "us-east-1".')
        });
    }
}
module.exports = DocumentController;