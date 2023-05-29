import AWS from 'aws-sdk';

const bucketName = process.env.REACT_APP_BUCKET_NAME
const bucketRegion = process.env.REACT_APP_BUCKET_REGION
const IdentityPoolId = process.env.REACT_APP_IDENTIFY_POOL_ID

AWS.config.update({
region: bucketRegion,
credentials: new AWS.CognitoIdentityCredentials({
IdentityPoolId: IdentityPoolId
})
});

const s3 = new AWS.S3({
apiVersion: "2006-03-01",
params: { Bucket: bucketName }
});

export function addPhoto(file,fileName,urlDate) {
    const photoKey = "images/" + fileName + "_" + urlDate + ".jpeg";
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: photoKey,
        Body: file
      }
    });
  
    const promise = upload.promise();
    promise.then(
      function(data) {
        alert("cargado con éxito", data);
      },
      function(err) {
        return alert("no se pudo cargar: ", err.message);
      }
    );
  }

export function addCSVtoS3(formData,urlDate) {

  const csvFileName = "tablas/"+formData.get("text")+ "_" + urlDate +".csv";

  const csvData = "url,text,prediction,metadata\n" +
                  formData.get("url") + "," +
                  formData.get("text") + "," +
                  formData.get("prediction") + "," +
                  formData.get("metadata");
                  
  const appendParams = {
    Bucket: bucketName,
    Key: csvFileName,
    Body: csvData,
    ContentEncoding: 'utf-8',
    ContentType: 'text/csv'
  };

  s3.putObject(appendParams, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}