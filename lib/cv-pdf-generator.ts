import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export async function generateCVPDF(elementId: string, fileName: string) {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      console.error("CV element not found")
      return
    }

    // Convert HTML to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Get canvas dimensions
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 10
    const availableWidth = pageWidth - 2 * margin
    const availableHeight = pageHeight - 2 * margin

    // Calculate proportional height for image
    const imgWidth = availableWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = margin

    // Add first page
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight)
    heightLeft -= availableHeight

    // Add remaining pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin
      pdf.addPage()
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight)
      heightLeft -= availableHeight
    }

    // Download PDF
    pdf.save(`${fileName}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("Failed to generate PDF. Please try again.")
  }
}
