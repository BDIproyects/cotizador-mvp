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
      email: email,
      rangoMin: rangoPrecio.min,
      rangoMax: rangoPrecio.max,
    };

    try {
      await axios.post('/api/cotizacion', datosFinales);
      
      siguientePaso({ email });
      iniciarCotizacion(); 

    } catch (error) {
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