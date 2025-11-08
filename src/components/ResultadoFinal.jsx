// frontend/src/components/ResultadoFinal.jsx
import React, { useRef } from 'react';
import html2canvas from 'html2canvas'; 
import jsPDF from 'jspdf';           

const formatPEN = (num) => new Intl.NumberFormat('es-PE', { 
    style: 'currency', 
    currency: 'PEN', 
    minimumFractionDigits: 2 
}).format(num);

const ResultadoFinal = ({ cotizacion, rangoPrecio }) => {
  const { metrosCuadrados, tipoMaterial, nivelUrgencia, email } = cotizacion;
  const { min, max, base } = rangoPrecio;

  const contentRef = useRef(null); 
  
  // Enlace de WhatsApp con el número 976908412
  const WHATSAPP_NUMBER = "51976908412"; 
  const WHATSAPP_MESSAGE = "Hola, vi tu proyecto de cotización, me interesa tener uno para mi negocio";
  const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  const handleDownloadPDF = () => {
    const input = contentRef.current; 
    if (!input) return;

    html2canvas(input, {
      scale: 2, 
      useCORS: true, 
      ignoreElements: (element) => element.classList.contains('final-actions') || element.classList.contains('important-note')
    })
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      pdf.save(`Cotizacion_Proyecto_${metrosCuadrados}m2.pdf`);
    });
  };


  return (
    <div className="resultado-final-container">
      
      <div ref={contentRef} className="pdf-content-wrapper"> 
        <div className="success-icon">✅</div>
        <h2>¡Tu Cotización está Lista!</h2>
        <p className="email-sent">Hemos enviado los detalles completos a <strong>{email}</strong></p>

        <div className="price-range">
          Rango de precio estimado
          <p className="price-value">
            {formatPEN(min)} - {formatPEN(max)}
          </p>
          <span className="currency">(PEN Soles Peruanos)</span> 
        </div>

        <div className="project-details">
          <div className="detail-row">
            <span>Tamaño del proyecto</span>
            <strong>{metrosCuadrados} metros cuadrados</strong>
          </div>
          <div className="detail-row">
            <span>Tipo de material</span>
            <strong>{tipoMaterial}</strong>
          </div>
          <div className="detail-row">
            <span>Nivel de urgencia</span>
            <strong>{nivelUrgencia}</strong>
          </div>
          <div className="detail-row">
            <span>Precio base estimado</span>
            <strong>{formatPEN(base)}</strong>
          </div>
        </div>

        <div className="important-note">
          <p>⚠️ Nota importante: Este es un estimado basado en los datos proporcionados. El precio final puede variar según las especificaciones exactas de tu proyecto.</p>
        </div>
      </div>
      
      <div className="final-actions">
        <button 
          className="btn-download" 
          onClick={handleDownloadPDF} 
        >
          Descargar PDF
        </button>
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-contact-link"
        >
          <button className="btn-contact">Contactar Ahora</button>
        </a>
      </div>
    </div>
  );
};

export default ResultadoFinal;