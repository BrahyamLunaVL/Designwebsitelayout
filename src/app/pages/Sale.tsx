import { ProductCard } from "../components/ProductCard";
import { products } from "../data/products";
import { Percent } from "lucide-react";

export function Sale() {
  const saleProducts = products.filter((p) => p.discount);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-accent rounded-lg p-2">
            <Percent className="h-6 w-6 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold">Special Offers</h1>
        </div>
        <p className="text-muted-foreground">
          Limited time discounts on premium collectibles • {saleProducts.length} products on sale
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {saleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
