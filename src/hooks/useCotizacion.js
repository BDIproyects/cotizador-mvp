// frontend/src/hooks/useCotizacion.js
import { useState, useMemo } from 'react';

export const useCotizacion = () => {
  const [paso, setPaso] = useState(1);
  const [cotizacion, setCotizacion] = useState({
    metrosCuadrados: 0,
    tipoMaterial: 'Estándar', 
    nivelUrgencia: 'Normal', 
    email: ''
  });
  const [esCotizado, setEsCotizado] = useState(false);

  const siguientePaso = (data) => {
    setCotizacion(prev => ({ ...prev, ...data }));
    setPaso(prev => prev < 4 ? prev + 1 : prev);
  };

  const atrasPaso = () => {
    setPaso(prev => prev > 1 ? prev - 1 : prev);
  };

  const iniciarCotizacion = () => {
    setEsCotizado(true);
  };

  const rangoPrecio = useMemo(() => {
    const { metrosCuadrados, tipoMaterial, nivelUrgencia } = cotizacion;
    if (metrosCuadrados === 0) return { min: 0, max: 0, base: 0 };

    const COSTO_BASE = 100;
    const COSTO_POR_M2 = 10;
    
    let precioBase = COSTO_BASE + (metrosCuadrados * COSTO_POR_M2);

    let multiplicadorMaterial = 1.0;
    if (tipoMaterial === 'Básico') multiplicadorMaterial = 0.9;
    if (tipoMaterial === 'Premium') multiplicadorMaterial = 1.25;
    precioBase *= multiplicadorMaterial;

    let multiplicadorUrgencia = 1.0;
    if (nivelUrgencia === 'Urgente') multiplicadorUrgencia = 1.30;
    if (nivelUrgencia === 'Express') multiplicadorUrgencia = 1.60;

    let precioBaseFinal = precioBase * multiplicadorUrgencia;
    
    const MIN_MULTIPLIER = 0.90; 
    const MAX_MULTIPLIER = 1.10; 

    const precioMinimo = Math.round(precioBaseFinal * MIN_MULTIPLIER);
    const precioMaximo = Math.round(precioBaseFinal * MAX_MULTIPLIER);

    return {
      base: Math.round(precioBaseFinal),
      min: precioMinimo,
      max: precioMaximo
    };
  }, [cotizacion.metrosCuadrados, cotizacion.tipoMaterial, cotizacion.nivelUrgencia]);

  return {
    paso,
    cotizacion,
    esCotizado,
    rangoPrecio,
    siguientePaso,
    atrasPaso,
    iniciarCotizacion
  };
};