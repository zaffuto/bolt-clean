import { ProductCarousel } from '@/components/products/product-carousel';
import { QRScanner } from '@/components/qr/qr-scanner';
import { EcoCuponGenerator } from '@/components/ecocupons/eco-cupon-generator';
import { storefrontClient } from '@/lib/shopify/client';
import { GET_PRODUCTS } from '@/lib/shopify/queries';
import { ProductsResponse } from '@/lib/shopify/types';

async function getProducts() {
  try {
    const data = await storefrontClient.request<ProductsResponse>(GET_PRODUCTS, {
      first: 10,
    });
    return data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function TestPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-8 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Carrusel de Productos</h2>
        <ProductCarousel products={products} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Lector QR</h2>
        <QRScanner 
          onScan={(result) => {
            'use server';
            console.log('QR escaneado:', result);
          }} 
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Generador de EcoCupón</h2>
        <EcoCuponGenerator 
          productId="test-product-id"
          onGenerate={(code) => {
            'use server';
            console.log('Cupón generado:', code);
          }} 
        />
      </section>
    </div>
  );
}
