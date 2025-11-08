// frontend/src/components/Paso3Urgencia.jsx
import React, { useState } from 'react';

const opcionesUrgencia = [
  { value: 'Normal', label: 'Normal (15-30 días)', desc: 'Sin recargo | Tiempo estándar de entrega' },
  { value: 'Urgente', label: 'Urgente (7-14 días)', desc: '+30% | Prioridad media' },
  { value: 'Express', label: 'Express (1-7 días)', desc: '+60% | Máxima prioridad' },
];

const Paso3Urgencia = ({ cotizacion, siguientePaso, atrasPaso }) => {
  const [seleccion, setSeleccion] = useState(cotizacion.nivelUrgencia);

  const handleSiguiente = () => {
    siguientePaso({ nivelUrgencia: seleccion });
  };

  return (
    <div className="card-content">
      <h2 className="title">¿Cuándo necesitas el proyecto?</h2>
      <p className="subtitle">El tiempo de entrega afecta el costo final</p>
      
      <div className="opciones-radio">
        {opcionesUrgencia.map((opcion) => (
          <div 
            key={opcion.value} 
            className={`radio-option ${seleccion === opcion.value ? 'selected' : ''}`}
            onClick={() => setSeleccion(opcion.value)}
          >
            <input
              type="radio"
              name="urgencia"
              value={opcion.value}
              checked={seleccion === opcion.value}
              onChange={() => setSeleccion(opcion.value)}
              style={{ display: 'none' }}
            />
            <strong className="radio-label">{opcion.label}</strong>
            <span className="radio-desc">{opcion.desc}</span>
          </div>
        ))}
      </div>

      <div className="actions with-back">
        <button onClick={atrasPaso} className="btn-atras">
          ← Atrás
        </button>
        <button onClick={handleSiguiente} className="btn-siguiente">
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default Paso3Urgencia;