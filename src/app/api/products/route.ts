import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Mock products data (fallback for development if DB is unreachable)
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Pure Glow Face Cleanser",
    description: "A gentle yet effective daily cleanser that removes impurities without stripping your skin of its natural oils.",
    price: 34.0,
    images: ["/images/cleaner.png"],
    category: "Cleanse",
    stock: 50,
    ingredients: "Aqua, Glycerin, Coco-Glucoside, Aloe Barbadensis Leaf Juice, Rosa Canina Fruit Oil",
    usage: "Apply to damp skin, massage gently for 60 seconds, rinse with lukewarm water.",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Ultra-Rich Daily Moisturizer",
    description: "A deeply hydrating moisturizer that locks in moisture for up to 72 hours with a lightweight, non-greasy formula.",
    price: 48.0,
    images: ["/images/moisturizer.png"],
    category: "Moisturize",
    stock: 45,
    ingredients: "Aqua, Squalane, Hyaluronic Acid, Shea Butter, Jojoba Seed Oil, Vitamin E",
    usage: "Apply evenly over face and neck after cleansing. Use morning and night.",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Rosehip Infused Facial Oil",
    description: "A luxurious facial oil rich in vitamins A, C, and E that rejuvenates and brightens dull, tired skin.",
    price: 52.0,
    images: ["/images/hero.png"],
    category: "Treat",
    stock: 15,
    ingredients: "Rosa Canina Seed Oil, Tocopherol, Retinol, Ascorbyl Palmitate",
    usage: "Apply 3-4 drops to clean skin before moisturizer.",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Botanical Vitamin C Serum",
    description: "A powerful 20% Vitamin C serum that brightens, firms, and protects against environmental damage.",
    price: 65.0,
    images: ["/images/cleaner.png"],
    category: "Treat",
    stock: 30,
    ingredients: "Ascorbic Acid (20%), Ferulic Acid, Hyaluronic Acid, Vitamin E",
    usage: "Apply 4-5 drops to clean skin in the morning.",
    rating: 5.0,
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const maxPrice = searchParams.get("maxPrice");

    // Build database query
    const where: any = {};
    if (category) {
      where.category = {
        in: category.split(","),
      };
    }
    if (maxPrice) {
      where.price = {
        lte: parseFloat(maxPrice),
      };
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-low-to-high") {
      orderBy = { price: "asc" };
    } else if (sort === "price-high-to-low") {
      orderBy = { price: "desc" };
    } else if (sort === "rating") {
      orderBy = { rating: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        reviews: true,
      },
    });

    // If no products in DB, provide mock fallback
    if (products.length === 0) {
      return NextResponse.json({ 
        products: MOCK_PRODUCTS, 
        total: MOCK_PRODUCTS.length,
        source: "mock" 
      });
    }

    const mappedProducts = products.map((p: any) => ({
      ...p,
      reviewsCount: p.reviews.length,
    }));

    return NextResponse.json({ 
      products: mappedProducts, 
      total: mappedProducts.length,
      source: "database"
    });
  } catch (error) {
    console.warn("Database connection issue, falling back to mock data:", error);
    return NextResponse.json({ 
      products: MOCK_PRODUCTS, 
      total: MOCK_PRODUCTS.length,
      source: "mock_fallback"
    });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, price, category, stock, images, ingredients, usage } = await request.json();

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        price: parseFloat(price),
        category,
        stock: parseInt(stock) || 0,
        images: images || [],
        ingredients: ingredients || "",
        usage: usage || "",
      },
    });

    return NextResponse.json({ product, source: "database" }, { status: 201 });
  } catch (error) {
    console.error("Product creation failed:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
