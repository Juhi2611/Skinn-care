import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL
});

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.loyaltyPoint.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Create Admin User
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@skinn.care",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create Sample Products
  const products = [
    {
      name: "Pure Glow Face Cleanser",
      description: "A gentle yet effective daily cleanser...",
      price: 34.0,
      image: "/images/cleaner.png",
      category: "Cleanse",
      stock: 50,
      rating: 4.8,
    },
    {
      name: "Ultra-Rich Daily Moisturizer",
      description: "A deeply hydrating moisturizer...",
      price: 48.0,
      image: "/images/moisturizer.png",
      category: "Moisturize",
      stock: 45,
      rating: 4.9,
    },
    {
      name: "Botanical Vitamin C Serum",
      description: "A powerful serum...",
      price: 65.0,
      image: "/images/cleaner.png",
      category: "Treat",
      stock: 30,
      rating: 5.0,
    },
    {
       name: "Daily Defense SPF 50",
       description: "Lightweight protection...",
       price: 42.0,
       image: "/images/hero.png",
       category: "Sun Care",
       stock: 60,
       rating: 4.9,
    },
    {
       name: "Rosehip Infused Facial Oil",
       description: "Luxurious rejuvenator...",
       price: 52.0,
       image: "/images/hero.png",
       category: "Treat",
       stock: 15,
       rating: 4.7,
    },
    {
       name: "Soothing Lavender Mask",
       description: "Calm and repair...",
       price: 28.0,
       image: "/images/moisturizer.png",
       category: "Masks",
       stock: 40,
       rating: 4.6,
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
