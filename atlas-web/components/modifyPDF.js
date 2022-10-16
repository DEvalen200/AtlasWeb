import { PDFDocument, PDFInvalidObject, rgb, StandardFonts } from "pdf-lib";
import FileSaver, { saveAs } from "file-saver";
import fontkit from "@pdf-lib/fontkit";

export class formParameters {
  constructor(
    Nombre,
    DNI,
    Provincia,
    Municipio,
    Direccion,
    Telefono,
    Correo,
    Acepta,
    Firma,
    Talla
  ) {
    this.Nombre = Nombre;
    this.DNI = DNI;
    this.Provincia = Provincia;
    this.Municipio = Municipio;
    this.Direccion = Direccion;
    this.Telefono = Telefono;
    this.Correo = Correo;
    this.Acepta = Acepta;
    this.Firma = Firma;
    this.Talla = Talla;
  }
}

export async function modifyPdf(canvasScreenshotURL, formParameters) {
  console.log("Downloading PDF");
  const url = "/CA ATLAS - SOLICITUD SOCIO VACIA.pdf";
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  //const helveticaFont = await pdfDoc.embedFont(StandardFonts.Tahoma)

  //FUENTE
  pdfDoc.registerFontkit(fontkit);
  pdfDoc.setTitle("CA ATLAS - SOLICITUD SOCIO " + formParameters.Nombre);
  const fontBytes = await fetch("TAHOMA_0.TTF").then((res) =>
    res.arrayBuffer()
  );
  const tahomaFont = await pdfDoc.embedFont(fontBytes, { subset: true });

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const secondPage = pages[1];

  const formDataText =
    formParameters.Nombre +
    " , " +
    formParameters.DNI +
    " , " +
    formParameters.Direccion +
    ", " +
    formParameters.Municipio +
    ", " +
    formParameters.Provincia +
    " , " +
    formParameters.Telefono +
    " , " +
    formParameters.Correo +
    " , " +
    formParameters.Talla;

  /*const text = 'Yo, '+ formParameters.Nombre +', con DNI '+ formParameters.DNI +', y domicilio en '+ formParameters.Direccion +', municipio de '+ formParameters.Municipio +', firmo la presente como reflejo de mi voluntad, de acuerdo con la normativa interna, con los derechos y deberes que esta supone, de pasar a ser socio del Club Atletismo Atlas para la próxima temporada atlética 2022 - 2023.\nAñado, a efectos de notificación, información y comunicación, mi teléfono '+ formParameters.Telefono +' y mi dirección electrónica '+ formParameters.Correo +', dejando estos datos a disposición de la entidad para que formen parte de los canales de información correspondientes.\n \nFirmando la presente también reflejo haber leído y estar de acuerdo con la Política de protección de datos y la Política de derechos de imagen de la entidad.\n \nFirmado en '+ formParameters.Municipio +', a '+ dayNames[date.getDay()] + ' ' + date.getDate() +' de '+ monthNames[date.getMonth()] +' del ' + date.getFullYear();
   */

  const { width, height } = firstPage.getSize();
  firstPage.drawText(formDataText, {
    x: 0,
    y: 0,
    size: 8,
    font: tahomaFont,
    color: rgb(1, 1, 1),
    //maxWidth: 450,
    lineHeight: 22,
    //rotate: degrees(-45),
  });

  //TEXTO/SCREENSHOT
  const screenshotPNGBytes = await fetch(canvasScreenshotURL).then((res) =>
    res.arrayBuffer()
  );
  const screenshotPNGImage = await pdfDoc.embedPng(screenshotPNGBytes);
  const screenshotPNGDims = screenshotPNGImage.scale(0.5);

  firstPage.drawImage(screenshotPNGImage, {
    x: firstPage.getWidth() / 2 - screenshotPNGDims.width / 2,
    y: firstPage.getHeight() / 2 - screenshotPNGDims.height / 2 + 175,
    width: screenshotPNGDims.width,
    height: screenshotPNGDims.height,
  });

  //FIRMA
  const firmaPNGBytes = await fetch(formParameters.Firma).then((res) =>
    res.arrayBuffer()
  );
  const firmaPNGImage = await pdfDoc.embedPng(firmaPNGBytes);
  const firmaPNGDims = firmaPNGImage.scale(0.5);

  firstPage.drawImage(firmaPNGImage, {
    x: firstPage.getWidth() / 2 - firmaPNGDims.width / 2 + 150,
    y: firstPage.getHeight() / 2 - firmaPNGDims.height / 2 - 200,
    width: firmaPNGDims.width,
    height: firmaPNGDims.height,
  });

  secondPage.drawImage(firmaPNGImage, {
    x: firstPage.getWidth() / 2 - firmaPNGDims.width / 2 + 150,
    y: firstPage.getHeight() / 2 - firmaPNGDims.height / 2 - 350,
    width: firmaPNGDims.width,
    height: firmaPNGDims.height,
  });

  const pdfBytes = await pdfDoc.save();
  console.log("Downloaded");
  var file = new File(
    [pdfBytes],
    "CA ATLAS - SOLICITUD SOCIO " + formParameters.Nombre + ".pdf",
    { type: "application/pdf" }
  );
  FileSaver.saveAs(file);
}
