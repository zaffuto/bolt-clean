'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { createEcoCupon } from '@/lib/supabase/db';

interface EcoCuponGeneratorProps {
  productId: number;
  onGenerate?: (code: string) => void;
}

export function EcoCuponGenerator({ productId, onGenerate }: EcoCuponGeneratorProps) {
  const [cuponCode, setCuponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateCupon = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const cupon = await createEcoCupon(productId);
      if (cupon) {
        setCuponCode(cupon.code);
        onGenerate?.(cupon.code);
      } else {
        setError('Error al generar el cupón');
      }
    } catch (err) {
      setError('Error al generar el cupón');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={generateCupon}
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
      >
        {isLoading ? 'Generando...' : 'Generar EcoCupón'}
      </button>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      {cuponCode && (
        <div className="p-4 border rounded-lg space-y-4">
          <p className="text-sm font-medium">Código: {cuponCode}</p>
          <div className="bg-white p-4 rounded-lg inline-block">
            <QRCodeSVG
              value={cuponCode}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
