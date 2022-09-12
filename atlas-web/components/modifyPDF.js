import {PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FileSaver, { saveAs } from 'file-saver';
import axios from 'axios';

export async function modifyPdf() {
    console.log("Downloading PDF");
    const url = 'http://localhost:9000/Test.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
      x: 5,
      y: height / 2 + 300,
      size: 50,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
      //rotate: degrees(-45),
    })
  
    const pdfBytes = await pdfDoc.save()
    console.log("Downloaded");
    var file = new File([pdfBytes], "Solicitud Socio.pdf", {type: "application/pdf"});
    FileSaver.saveAs(file);
  }