import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportCVToPDF = async (cvElement, fileName = 'CV') => {
  try {
    // Show loading indicator
    const loadingElement = document.createElement('div');
    loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 20px 40px;
      border-radius: 8px;
      z-index: 10000;
      font-family: Arial, sans-serif;
    `;
    loadingElement.textContent = 'Generating PDF...';
    document.body.appendChild(loadingElement);

    // Create a clone of the element for better rendering
    const clone = cvElement.cloneNode(true);
    // Remove height/overflow limits so FULL content is captured (preview uses maxHeight + overflow:auto)
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.width = '210mm'; // A4 width
    clone.style.setProperty('max-height', 'none', 'important');
    clone.style.setProperty('overflow', 'visible', 'important');
    clone.style.height = 'auto';
    clone.style.minHeight = 'auto';
    clone.style.background = 'white';
    // Clear max-height/overflow on all descendants so nothing clips
    clone.querySelectorAll('*').forEach((el) => {
      if (el.style) {
        el.style.setProperty('max-height', 'none', 'important');
        el.style.setProperty('overflow', 'visible', 'important');
      }
    });
    document.body.appendChild(clone);
    // Let layout complete so full height is calculated
    await new Promise((r) => setTimeout(r, 100));

    // Convert to canvas - capture full content (no height limit)
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      logging: false,
      width: 794, // A4 width in pixels at 96 DPI
      windowWidth: 794,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // Remove clone
    document.body.removeChild(clone);
    document.body.removeChild(loadingElement);

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save PDF
    pdf.save(`${fileName}.pdf`);
    
    return { success: true };
  } catch (error) {
    console.error('Error exporting PDF:', error);
    return { success: false, error: error.message };
  }
};
