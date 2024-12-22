'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface EcoCuponGeneratorProps {
  productId: string;
  onGenerate?: (code: string) => void;
}

export function EcoCuponGenerator({ productId, onGenerate }: EcoCuponGeneratorProps) {
  const [cuponCode, setCuponCode] = useState('');

  const generateCupon = async () => {
    // Generar un código único
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const code = `ECO-${productId.slice(0, 6)}-${timestamp}-${randomStr}`;
    
    setCuponCode(code);
    onGenerate?.(code);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={generateCupon}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Generar EcoCupón
      </button>

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
