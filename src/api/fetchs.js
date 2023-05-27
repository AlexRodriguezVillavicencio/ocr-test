// GET RECOGNITION
export const getRecognition = async (dataURL) => {

  const formData = new FormData();
  formData.append("base64Image", dataURL);
  formData.append("language"   , "eng");
  formData.append("apikey"  , "K87428168588957");
  console.log('1entrada');
  try {
      const response = await fetch('https://api.ocr.space/parse/image',{
        method: 'POST', 
        body: formData
      }).then((response) => response.json())
      .then((ocrParsedResult) =>{
        const parsedResults = ocrParsedResult["ParsedResults"]
        return parsedResults[0]['ParsedText']}
      );
      return response;
    } catch (error) {
      return error.message;
    }
}