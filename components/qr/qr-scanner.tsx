'use client';

import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Configuración del escáner
    scannerRef.current = new Html5QrcodeScanner(
      'qr-reader',
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      },
      false
    );

    // Iniciar el escaneo
    scannerRef.current.render(
      (decodedText) => {
        // Éxito en el escaneo
        onScan(decodedText);
      },
      (errorMessage) => {
        // Error en el escaneo
        console.warn(`Código QR error: ${errorMessage}`);
        onError?.(errorMessage);
      }
    );

    // Limpiar al desmontar
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [onScan, onError]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div id="qr-reader" className="rounded-lg overflow-hidden" />
    </div>
  );
}
