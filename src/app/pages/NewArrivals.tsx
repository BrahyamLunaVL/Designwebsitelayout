import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";

export function NewArrivals() {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">New Arrivals</h1>
        <p className="text-muted-foreground">
          Check out our latest additions • {newProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
