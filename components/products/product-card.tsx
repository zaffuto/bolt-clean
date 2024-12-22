import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/shopify/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group relative rounded-lg border p-4 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square relative mb-4">
        {firstImage && (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{product.title}</h3>
        {firstVariant && (
          <p className="text-sm text-gray-500">
            {firstVariant.price.amount} {firstVariant.price.currencyCode}
          </p>
        )}
      </div>
    </Link>
  );
}
