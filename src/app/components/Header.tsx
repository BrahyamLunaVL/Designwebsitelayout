import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { LoginDialog } from "./LoginDialog";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const location = useLocation();
  const { getCartItemsCount, favorites } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-2">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary">CollectHub</h1>
                <p className="text-xs text-muted-foreground">Premium Collectibles</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search collectibles..."
                  className="pl-10 bg-background"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* User Menu */}
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-2">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites">My Favorites</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin" className="text-[#0D21A1] font-medium">
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowLoginDialog(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              )}

              {/* Favorites */}
              <Link to="/favorites">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getCartItemsCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemsCount()}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search collectibles..."
                className="pl-10 bg-background"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6 pb-4 border-t pt-4">
            <Link
              to="/"
              className={`hover:text-primary transition-colors ${
                isActive("/") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`hover:text-primary transition-colors ${
                isActive("/products") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              All Products
            </Link>
            <Link
              to="/new-arrivals"
              className={`hover:text-primary transition-colors ${
                isActive("/new-arrivals") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              New Arrivals
            </Link>
            <Link
              to="/best-sellers"
              className={`hover:text-primary transition-colors ${
                isActive("/best-sellers") ? "text-primary font-medium" : "text-foreground"
              }`}
            >
              Best Sellers
            </Link>
            <Link
              to="/sale"
              className={`hover:text-accent transition-colors ${
                isActive("/sale") ? "text-accent font-medium" : "text-foreground"
              }`}
            >
              Sale
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden border-t bg-card px-4 py-4 space-y-2">
            <Link
              to="/"
              className={`block py-2 px-3 rounded-md ${
                isActive("/") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`block py-2 px-3 rounded-md ${
                isActive("/products") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            <Link
              to="/new-arrivals"
              className={`block py-2 px-3 rounded-md ${
                isActive("/new-arrivals") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              to="/best-sellers"
              className={`block py-2 px-3 rounded-md ${
                isActive("/best-sellers") ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Best Sellers
            </Link>
            <Link
              to="/sale"
              className={`block py-2 px-3 rounded-md ${
                isActive("/sale") ? "bg-accent text-accent-foreground" : "hover:bg-muted"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Sale
            </Link>
          </nav>
        )}
      </header>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  );
}