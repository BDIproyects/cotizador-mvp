// frontend/src/components/Paso1Metros.jsx
import React, { useState } from 'react';

const Paso1Metros = ({ cotizacion, siguientePaso }) => {
  // Usar el valor actual del estado global como inicial
  const [metros, setMetros] = useState(cotizacion.metrosCuadrados || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que sea un número positivo
    if (parseInt(metros) > 0) {
      siguientePaso({ metrosCuadrados: parseInt(metros) });
    } else {
      alert("Por favor, ingresa un número válido de metros cuadrados.");
    }
  };

  return (
    <div className="card-content">
      <h2 className="title">¿Cuántos metros cuadrados necesitas?</h2>
      <p className="subtitle">Ingresa el tamaño aproximado del proyecto</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="metros" className="label">Metros cuadrados (m²)</label>
        <input
          id="metros"
          type="number"
          min="1"
          value={metros}
          onChange={(e) => setMetros(e.target.value)}
          placeholder="Ej: 50"
          className="input-field"
        />
        <p className="tip">💡 Tip: Si no estás seguro del tamaño exacto, una estimación aproximada es suficiente.</p>
        <div className="actions">
          <button type="submit" disabled={!metros || metros <= 0} className="btn-siguiente">
            Siguiente →
          </button>
        </div>
      </form>
    </div>
  );
};

export default Paso1Metros;