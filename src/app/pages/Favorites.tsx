import { Link } from "react-router";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../context/CartContext";

export function Favorites() {
  const { favorites } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-muted rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-6">
            Start adding your favorite collectibles to easily find them later!
          </p>
          <Link to="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">
          You have {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your favorites
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
