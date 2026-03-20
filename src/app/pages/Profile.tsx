import { useAuth } from "../context/AuthContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { User, Mail, Phone, MapPin, CreditCard, Package } from "lucide-react";
import { useNavigate } from "react-router";

export function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-muted rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Not Logged In</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your profile.
          </p>
          <Button size="lg" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
              <Button variant="outline" className="w-full mb-2">
                Edit Profile Picture
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">12 Orders</p>
                  <p className="text-xs text-muted-foreground">Total purchases</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">$1,284.50</p>
                  <p className="text-xs text-muted-foreground">Total spent</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Personal Information</h3>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={user.name.split(' ')[0]}
                    className="bg-background mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={user.name.split(' ').slice(1).join(' ')}
                    className="bg-background mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="bg-background pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (234) 567-890"
                    className="bg-background pl-10"
                  />
                </div>
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Shipping Address</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="123 Collector's Avenue"
                    className="bg-background pl-10"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Model City"
                    className="bg-background mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    placeholder="MC"
                    className="bg-background mt-1"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip">ZIP/Postal Code</Label>
                  <Input
                    id="zip"
                    placeholder="12345"
                    className="bg-background mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    className="bg-background mt-1"
                  />
                </div>
              </div>
              <Button>Save Address</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Order #12345</p>
                  <p className="text-sm text-muted-foreground">March 15, 2026 • 3 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">$247.50</p>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Order #12344</p>
                  <p className="text-sm text-muted-foreground">March 10, 2026 • 2 items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">$189.99</p>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Order #12343</p>
                  <p className="text-sm text-muted-foreground">March 5, 2026 • 1 item</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">$74.99</p>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
