import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

export function BestSellers() {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Best Sellers</h1>
        <p className="text-muted-foreground">
          Most popular collectibles among our community • {bestSellers.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
