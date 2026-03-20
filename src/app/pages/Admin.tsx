import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  Plus,
  Eye,
  MapPin,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Check,
  X,
  Filter,
  Search,
} from "lucide-react";
import { categories, scales, brands } from "../data/products";
import { toast } from "sonner";

export function Admin() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin (in production, this would come from the user object)
  const isAdmin = user?.email === "admin@example.com";

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to access admin panel");
      navigate("/");
    } else if (!isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Mock stats data
  const stats = {
    totalRevenue: 45230.5,
    totalOrders: 234,
    totalProducts: 48,
    totalCustomers: 156,
    recentSales: [
      { date: "2026-03-20", amount: 1250.0, orders: 8 },
      { date: "2026-03-19", amount: 980.5, orders: 6 },
      { date: "2026-03-18", amount: 1420.0, orders: 9 },
      { date: "2026-03-17", amount: 750.0, orders: 5 },
      { date: "2026-03-16", amount: 1100.0, orders: 7 },
      { date: "2026-03-15", amount: 890.0, orders: 4 },
      { date: "2026-03-14", amount: 1340.0, orders: 10 },
    ],
    topProducts: [
      { name: "Porsche 911 GT3 RS", sold: 45, revenue: 6750.0 },
      { name: "Ferrari F40", sold: 38, revenue: 6460.0 },
      { name: "Lamborghini Countach", sold: 32, revenue: 5120.0 },
      { name: "McLaren F1", sold: 28, revenue: 6160.0 },
      { name: "Nissan GT-R R34", sold: 25, revenue: 3375.0 },
    ],
  };

  // Form state for new product
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    scale: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    isBestSeller: false,
    isNewArrival: false,
    discount: "",
  });

  // Orders state
  type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

  interface OrderItem {
    productName: string;
    quantity: number;
    price: number;
  }

  interface Order {
    id: string;
    orderNumber: string;
    date: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    status: OrderStatus;
    paymentMethod: string;
  }

  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2026-001",
      date: "2026-03-20",
      customerName: "Michael Rodriguez",
      customerEmail: "michael.r@email.com",
      customerPhone: "+1 (555) 123-4567",
      shippingAddress: {
        street: "1234 Collector's Lane",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "USA",
      },
      items: [
        { productName: "Porsche 911 GT3 RS", quantity: 2, price: 149.99 },
        { productName: "Ferrari F40", quantity: 1, price: 169.99 },
      ],
      subtotal: 469.97,
      shipping: 15.00,
      total: 484.97,
      status: "shipped",
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      orderNumber: "ORD-2026-002",
      date: "2026-03-19",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.johnson@email.com",
      customerPhone: "+1 (555) 234-5678",
      shippingAddress: {
        street: "789 Model Avenue",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
      items: [
        { productName: "Lamborghini Countach", quantity: 1, price: 159.99 },
        { productName: "McLaren F1", quantity: 1, price: 219.99 },
      ],
      subtotal: 379.98,
      shipping: 12.00,
      total: 391.98,
      status: "delivered",
      paymentMethod: "PayPal",
    },
    {
      id: "3",
      orderNumber: "ORD-2026-003",
      date: "2026-03-19",
      customerName: "David Chen",
      customerEmail: "david.chen@email.com",
      customerPhone: "+1 (555) 345-6789",
      shippingAddress: {
        street: "456 Speedway Drive",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        country: "USA",
      },
      items: [
        { productName: "Nissan GT-R R34", quantity: 3, price: 134.99 },
      ],
      subtotal: 404.97,
      shipping: 10.00,
      total: 414.97,
      status: "processing",
      paymentMethod: "Credit Card",
    },
    {
      id: "4",
      orderNumber: "ORD-2026-004",
      date: "2026-03-18",
      customerName: "Emily Watson",
      customerEmail: "emily.watson@email.com",
      customerPhone: "+1 (555) 456-7890",
      shippingAddress: {
        street: "321 Racing Street",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "USA",
      },
      items: [
        { productName: "Aston Martin DB5", quantity: 1, price: 189.99 },
        { productName: "BMW M3 E30", quantity: 2, price: 119.99 },
      ],
      subtotal: 429.97,
      shipping: 15.00,
      total: 444.97,
      status: "shipped",
      paymentMethod: "Debit Card",
    },
    {
      id: "5",
      orderNumber: "ORD-2026-005",
      date: "2026-03-18",
      customerName: "James Wilson",
      customerEmail: "james.wilson@email.com",
      customerPhone: "+1 (555) 567-8901",
      shippingAddress: {
        street: "987 Vintage Road",
        city: "Austin",
        state: "TX",
        zipCode: "73301",
        country: "USA",
      },
      items: [
        { productName: "Ford GT40", quantity: 1, price: 199.99 },
      ],
      subtotal: 199.99,
      shipping: 10.00,
      total: 209.99,
      status: "pending",
      paymentMethod: "Credit Card",
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [editedStatus, setEditedStatus] = useState<OrderStatus | null>(null);
  const [hasStatusChanged, setHasStatusChanged] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    customerName: "",
    orderNumber: "",
    status: "all",
    date: "",
    productName: "",
  });

  // Filter orders based on all criteria
  const filteredOrders = mockOrders.filter((order) => {
    // Filter by customer name
    if (
      filters.customerName &&
      !order.customerName.toLowerCase().includes(filters.customerName.toLowerCase())
    ) {
      return false;
    }

    // Filter by order number
    if (
      filters.orderNumber &&
      !order.orderNumber.toLowerCase().includes(filters.orderNumber.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (filters.status !== "all" && order.status !== filters.status) {
      return false;
    }

    // Filter by date
    if (filters.date && order.date !== filters.date) {
      return false;
    }

    // Filter by product name (check if any item in the order matches)
    if (filters.productName) {
      const hasMatchingProduct = order.items.some((item) =>
        item.productName.toLowerCase().includes(filters.productName.toLowerCase())
      );
      if (!hasMatchingProduct) {
        return false;
      }
    }

    return true;
  });

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      customerName: "",
      orderNumber: "",
      status: "all",
      date: "",
      productName: "",
    });
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setEditedStatus(order.status);
    setHasStatusChanged(false);
    setIsOrderDialogOpen(true);
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    setEditedStatus(newStatus);
    setHasStatusChanged(newStatus !== selectedOrder?.status);
  };

  const handleSaveStatus = () => {
    if (selectedOrder && editedStatus) {
      // In production, this would update the order in the database
      toast.success(`Order status updated to ${editedStatus}`);
      setSelectedOrder({ ...selectedOrder, status: editedStatus });
      setHasStatusChanged(false);
    }
  };

  const handleCancelStatusChange = () => {
    setEditedStatus(selectedOrder?.status || null);
    setHasStatusChanged(false);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to an API
    console.log("New product:", formData);
    toast.success("Product added successfully!");
    // Reset form
    setFormData({
      name: "",
      brand: "",
      category: "",
      scale: "",
      price: "",
      description: "",
      image: "",
      stock: "",
      isBestSeller: false,
      isNewArrival: false,
      discount: "",
    });
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage products and view sales statistics
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-[#EEC643]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+12.5%</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-[#0D21A1]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+8.2%</span> from
                  last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-[#011638]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+4</span> new this
                  month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-[#EEC643]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+15</span> new this
                  month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Sales (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentSales.map((sale, index) => {
                  const maxAmount = Math.max(
                    ...stats.recentSales.map((s) => s.amount)
                  );
                  const percentage = (sale.amount / maxAmount) * 100;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{sale.date}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-muted-foreground">
                            {sale.orders} orders
                          </span>
                          <span className="font-bold text-[#0D21A1]">
                            ${sale.amount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0D21A1] to-[#EEC643] transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pb-4 border-b last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0D21A1] text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sold} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#0D21A1]">
                        ${product.revenue.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Manage Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Filters Section */}
                <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-[#0D21A1]" />
                      <h3 className="font-semibold">Filters</h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="filterCustomerName" className="text-sm">
                        Customer Name
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="filterCustomerName"
                          name="customerName"
                          value={filters.customerName}
                          onChange={(e) => handleFilterChange("customerName", e.target.value)}
                          placeholder="Search by name..."
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filterOrderNumber" className="text-sm">
                        Order Number
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="filterOrderNumber"
                          name="orderNumber"
                          value={filters.orderNumber}
                          onChange={(e) => handleFilterChange("orderNumber", e.target.value)}
                          placeholder="Search by order number..."
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filterStatus" className="text-sm">
                        Status
                      </Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange("status", value)}
                      >
                        <SelectTrigger id="filterStatus">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filterDate" className="text-sm">
                        Date
                      </Label>
                      <Input
                        id="filterDate"
                        name="date"
                        type="date"
                        value={filters.date}
                        onChange={(e) => handleFilterChange("date", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2 lg:col-span-2">
                      <Label htmlFor="filterProductName" className="text-sm">
                        Product Name
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="filterProductName"
                          name="productName"
                          value={filters.productName}
                          onChange={(e) => handleFilterChange("productName", e.target.value)}
                          placeholder="Search by product name..."
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Results count */}
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Showing <span className="font-semibold text-[#0D21A1]">{filteredOrders.length}</span> of{" "}
                      <span className="font-semibold">{mockOrders.length}</span> orders
                    </p>
                  </div>
                </div>

                {/* Orders List */}
                <div className="space-y-3">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.customerName}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} border`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                            <p className="font-bold text-[#0D21A1]">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleViewOrder(order)}
                            className="h-10 w-10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No orders found</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your filters to see more results
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Add Product Tab */}
        <TabsContent value="add-product">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Porsche 911 GT3 RS"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Select
                      value={formData.brand}
                      onValueChange={(value) => handleSelectChange("brand", value)}
                      required
                    >
                      <SelectTrigger id="brand">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.filter((b) => b !== "All").map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter((c) => c !== "All").map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scale">Scale *</Label>
                    <Select
                      value={formData.scale}
                      onValueChange={(value) => handleSelectChange("scale", value)}
                      required
                    >
                      <SelectTrigger id="scale">
                        <SelectValue placeholder="Select scale" />
                      </SelectTrigger>
                      <SelectContent>
                        {scales.filter((s) => s !== "All").map((scale) => (
                          <SelectItem key={scale} value={scale}>
                            {scale}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={handleInputChange}
                      placeholder="0"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      name="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={handleInputChange}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL *</Label>
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isBestSeller"
                      name="isBestSeller"
                      checked={formData.isBestSeller}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <Label htmlFor="isBestSeller" className="font-normal">
                      Mark as Best Seller
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isNewArrival"
                      name="isNewArrival"
                      checked={formData.isNewArrival}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <Label htmlFor="isNewArrival" className="font-normal">
                      Mark as New Arrival
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-[#0D21A1] hover:bg-[#011638]"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      setFormData({
                        name: "",
                        brand: "",
                        category: "",
                        scale: "",
                        price: "",
                        description: "",
                        image: "",
                        stock: "",
                        isBestSeller: false,
                        isNewArrival: false,
                        discount: "",
                      })
                    }
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View complete order information and shipping details
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-medium">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {selectedOrder.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={`${getStatusColor(selectedOrder.status)} border`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    {selectedOrder.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Customer Information */}
              <div>
                <h3 className="font-semibold mb-3 text-[#0D21A1]">Customer Information</h3>
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-[#0D21A1] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedOrder.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#0D21A1] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#0D21A1] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-3 text-[#0D21A1]">Shipping Address</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-[#0D21A1] mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium">{selectedOrder.shippingAddress.street}</p>
                        <p className="text-sm">
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                          {selectedOrder.shippingAddress.zipCode}
                        </p>
                        <p className="text-sm font-medium">{selectedOrder.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Embedded Map */}
                  <div className="rounded-lg overflow-hidden border">
                    <iframe
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                        `${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.city}, ${selectedOrder.shippingAddress.state} ${selectedOrder.shippingAddress.zipCode}, ${selectedOrder.shippingAddress.country}`
                      )}&zoom=15`}
                      title="Shipping Address Map"
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h3 className="font-semibold mb-3 text-[#0D21A1]">Update Order Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Select
                      value={editedStatus || selectedOrder.status}
                      onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    {hasStatusChanged && (
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          onClick={handleSaveStatus}
                          className="bg-green-600 hover:bg-green-700 h-10 w-10"
                          title="Confirm"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={handleCancelStatusChange}
                          className="h-10 w-10"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  {hasStatusChanged && (
                    <p className="text-sm text-muted-foreground">
                      Click the check button to save or X to cancel changes
                    </p>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3 text-[#0D21A1]">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-[#0D21A1]" />
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-[#0D21A1]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">
                      ${selectedOrder.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      ${selectedOrder.shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-[#0D21A1]">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}