import { ProductCarousel } from '@/components/products/product-carousel';
import { QRScanner } from '@/components/qr/qr-scanner';
import { EcoCuponGenerator } from '@/components/ecocupons/eco-cupon-generator';
import { getProducts } from '@/lib/supabase/db';

export default async function TestPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-8 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Productos Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 space-y-4">
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>
              <EcoCuponGenerator 
                productId={product.id}
                onGenerate={(code) => {
                  console.log('Cupón generado:', code);
                }} 
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Validar EcoCupón</h2>
        <QRScanner 
          onScan={(result) => {
            console.log('QR escaneado:', result);
          }} 
        />
      </section>
    </div>
  );
}
