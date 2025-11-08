// frontend/src/App.jsx
import React from 'react';
import { useCotizacion } from './hooks/useCotizacion';
import Paso1Metros from './components/Paso1Metros';
import Paso2Material from './components/Paso2Material';
import Paso3Urgencia from './components/Paso3Urgencia';
import Paso4Email from './components/Paso4Email';
import ResultadoFinal from './components/ResultadoFinal';

// Componente para la barra de progreso
const ProgressBar = ({ pasoActual }) => (
  <div className="progress-bar-container">
    {[1, 2, 3, 4].map((step) => (
      <React.Fragment key={step}>
        <div className={`step-circle ${pasoActual >= step ? 'completed' : ''} ${pasoActual === step ? 'active' : ''}`}>
          {pasoActual > step ? '✓' : step}
        </div>
        {step < 4 && (
          <div className={`step-line ${pasoActual > step ? 'completed' : ''}`}></div>
        )}
      </React.Fragment>
    ))}
  </div>
);

function App() {
  const { 
    paso, 
    cotizacion, 
    esCotizado, 
    rangoPrecio, 
    siguientePaso, 
    atrasPaso, 
    iniciarCotizacion 
  } = useCotizacion();

  // Función para renderizar el componente de paso actual
  const renderPaso = () => {
    switch (paso) {
      case 1:
        return <Paso1Metros cotizacion={cotizacion} siguientePaso={siguientePaso} />;
      case 2:
        return <Paso2Material cotizacion={cotizacion} siguientePaso={siguientePaso} atrasPaso={atrasPaso} />;
      case 3:
        return <Paso3Urgencia cotizacion={cotizacion} siguientePaso={siguientePaso} atrasPaso={atrasPaso} />;
      case 4:
        return <Paso4Email 
                  cotizacion={cotizacion} 
                  rangoPrecio={rangoPrecio}
                  siguientePaso={siguientePaso} 
                  atrasPaso={atrasPaso}
                  iniciarCotizacion={iniciarCotizacion}
               />;
      default:
        return <div>Error de paso.</div>;
    }
  };

  return (
    <div className="app-container">
      <div className="cotizador-card">
        <div className="calculator-header">
          <div className="icon-calc">🧮</div>
          <h1>Calculadora de Cotización Rápida</h1>
          <p>Obtén un estimado de costos en menos de 1 minuto</p>
        </div>

        {/* Muestra la barra de progreso solo si NO está en la pantalla final */}
        {!esCotizado && <ProgressBar pasoActual={paso} />}

        <div className="form-container">
          {esCotizado ? (
            <ResultadoFinal cotizacion={cotizacion} rangoPrecio={rangoPrecio} />
          ) : (
            renderPaso()
          )}
        </div>
        
      </div>
      
      {/* Footer de información general */}
      <div className="info-footer">
        <span>✓ Sin compromiso</span>
        <span>✓ Respuesta en 24h</span>
        <span>✓ Asesoría gratuita</span>
      </div>
    </div>
  );
}

export default App;