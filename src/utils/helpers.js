export function ProcessIMG(dataURL) {
  /**
    * Procesa una URL de datos y devuelve un blob.
    * @param {string} dataURL - La URL de datos a procesar.
    * @return {Blob} - El blob resultante.
  */
  const imageData = dataURL.split(',')[1];
  const binaryData = atob(imageData);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    view[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
  return blob
}
  
export function formDataCSV(prediction,text){
  const currentDate = new Date();
  const urlDate = currentDate.toString()
        .substring(0, currentDate.toString().lastIndexOf('(')-1)
        .replace(/\s/g,'_');

  const formDataCSV = new FormData();
  formDataCSV.append("url", `../images/${text + "_" + urlDate}`);
  formDataCSV.append("text", text);
  formDataCSV.append("prediction", prediction);
  formDataCSV.append("metadata", currentDate.toString());

  return { formData: formDataCSV, urlDate: urlDate };
}