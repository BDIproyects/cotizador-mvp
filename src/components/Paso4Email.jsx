// frontend/src/components/Paso4Email.jsx
import React, { useState } from 'react';
import axios from 'axios';

const formatPEN = (num) => new Intl.NumberFormat('es-PE', { 
  style: 'currency', 
  currency: 'PEN', 
  minimumFractionDigits: 2 
}).format(num);

const Paso4Email = ({ cotizacion, rangoPrecio, siguientePaso, atrasPaso, iniciarCotizacion }) => {
  const [email, setEmail] = useState(cotizacion.email || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    setIsLoading(true);

    const datosFinales = {
      ...cotizacion,
      rangoMin: rangoPrecio.min,
      rangoMax: rangoPrecio.max,
    };

    try {
      // Llamada a la Serverless Function de Vercel
      await axios.post('/api/cotizacion', datosFinales);
      
      // Éxito: Guardar email y mostrar el resultado final
      siguientePaso({ email });
      iniciarCotizacion(); 

    } catch (error) {
      console.error('Error al enviar el lead al backend:', error);
      // Mantenemos la UX si el backend falla.
      siguientePaso({ email });
      iniciarCotizacion(); 
      alert("Advertencia: No se pudo registrar tu lead, pero puedes ver tu cotización.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card-content">
      <h2 className="title">Recibe tu cotización detallada</h2>
      <p className="subtitle">Te enviaremos un presupuesto completo a tu correo</p>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="label">Correo electrónico</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@gmail.com"
          required
          className="input-field email-field"
        />

        <div className="resumen-cotizacion">
          <p className="resumen-title">Resumen de tu cotización:</p>
          <div className="resumen-data">
            <p>Tamaño: <strong>{cotizacion.metrosCuadrados} m²</strong></p>
            <p>Material: <strong>{cotizacion.tipoMaterial}</strong></p>
            <p>Urgencia: <strong>{cotizacion.nivelUrgencia}</strong></p>
            <p className="rango-final">Rango estimado: 
              <span className="rango-valor">{formatPEN(rangoPrecio.min)} - {formatPEN(rangoPrecio.max)}</span>
            </p>
          </div>
        </div>
        
        <p className="tip warning">⚠️ Tu información está segura. Solo la usaremos para enviarte tu cotización.</p>

        <div className="actions with-back">
          <button 
            type="button" 
            onClick={atrasPaso} 
            className="btn-atras" 
            disabled={isLoading}
          >
            ← Atrás
          </button>
          <button 
            type="submit" 
            className="btn-cotizacion" 
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Ver Mi Cotización'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Paso4Email;