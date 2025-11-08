// frontend/src/components/Paso2Material.jsx
import React, { useState } from 'react';

const opcionesMaterial = [
  { value: 'Básico', label: 'Básico', desc: 'Material estándar, ideal para presupuestos ajustados' },
  { value: 'Estándar', label: 'Estándar', desc: 'Buena calidad-precio, la opción más popular' },
  { value: 'Premium', label: 'Premium', desc: 'Materiales de alta gama y máxima durabilidad' },
];

const Paso2Material = ({ cotizacion, siguientePaso, atrasPaso }) => {
  const [seleccion, setSeleccion] = useState(cotizacion.tipoMaterial);

  const handleSiguiente = () => {
    siguientePaso({ tipoMaterial: seleccion });
  };

  return (
    <div className="card-content">
      <h2 className="title">Tipo de material o servicio</h2>
      <p className="subtitle">Selecciona la calidad que se ajusta a tu presupuesto</p>
      
      <div className="opciones-radio">
        {opcionesMaterial.map((opcion) => (
          <div 
            key={opcion.value} 
            className={`radio-option ${seleccion === opcion.value ? 'selected' : ''}`}
            onClick={() => setSeleccion(opcion.value)}
          >
            <input
              type="radio"
              name="material"
              value={opcion.value}
              checked={seleccion === opcion.value}
              onChange={() => setSeleccion(opcion.value)}
              style={{ display: 'none' }} // Ocultar el radio nativo
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

export default Paso2Material;