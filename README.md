# cypress-run-uploader
Bundles Cypress test run information and uploads it somewhere 📦⬆️ 

## Example

This will bundle (tar) the `cypress` directory and upload the bundle to `http://my-dashboard/upload`. 

````
node index.js cypress/ http://my-dashboard/upload
````

Upload request is a `POST` request with content type `multipart/form-data`.
The bundle will be transfered as form item `cypress-run` 

## Bundle Content

The tar-bundle contains a `run.json` file, with some additional run information. Have a look at the sample below.

````
{
  "gitCommit": {
    "branchName": "master",
    "hash": "3ddae557ad45ac68a76a13414b65004c4fa792ff",
    "authorName": "Samuel Menigat",
    "authorEmail": "samuel.menigat@gmail.com",
    "authorDate": "1509106930",
    "subject": "feat(bundling): changes bundle format to tar from zip"
  },
  "video": "3xz0l.mp4",
  "screenshots": [
    {
      "name": "0.png",
      "originalName": "screenshot-1.png"
    },
    {
      "name": "1.png",
      "originalName": "screenshot-2.png"
    },
  ]
}
````

Additionaly the referenced `video` and `screenshots` are contained.