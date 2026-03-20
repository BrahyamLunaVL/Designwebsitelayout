import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, isFavorite } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    if (isFavorite(product.id)) {
      toast("Removed from favorites");
    } else {
      toast.success("Added to favorites!");
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <Badge className="bg-accent text-accent-foreground">New</Badge>
          )}
          {product.isBestSeller && (
            <Badge className="bg-primary text-primary-foreground">Best Seller</Badge>
          )}
          {product.discount && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-card/80 backdrop-blur-sm hover:bg-card ${
            isFavorite(product.id) ? "text-red-500" : ""
          }`}
          onClick={handleToggleFavorite}
        >
          <Heart
            className="h-5 w-5"
            fill={isFavorite(product.id) ? "currentColor" : "none"}
          />
        </Button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        {/* Brand and Scale */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand}</span>
          <span>{product.scale}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium line-clamp-2 min-h-[3rem]">{product.name}</h3>

        {/* Category */}
        <p className="text-sm text-muted-foreground">{product.category}</p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full"
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
