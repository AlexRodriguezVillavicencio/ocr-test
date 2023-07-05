const apikey = process.env.REACT_APP_API_KEY_OCR
const routeApi = process.env.REACT_APP_ROUTE_API_KEY

// GET RECOGNITION
export const getRecognition = async (dataURL) => {

  const formData = new FormData();
  formData.append("base64Image", dataURL);
  formData.append("language"   , "eng");
  formData.append("apikey" , apikey);
  try {
      const response = await fetch(routeApi,{
        method: 'POST', 
        body: formData
      }).then((response) => response.json())
      .then((ocrParsedResult) =>{
        const parsedResults = ocrParsedResult["ParsedResults"]
        return parsedResults[0]['ParsedText']}
      );
      console.log("respuesta")
      alert(response)
      console.log(response)
      return response;
    } catch (error) {
      return error.message;
    }
}