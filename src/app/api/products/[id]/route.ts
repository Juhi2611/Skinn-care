import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          include: {
            user: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });

    if (!product) {
      return NextResponse.json({ error: "Ritual not found" }, { status: 404 });
    }

    const mappedProduct = {
      ...product,
      reviews: product.reviews.map(r => ({
        id: r.id,
        user: (r.user as any)?.name || "Anonymous Patron",
        rating: r.rating,
        comment: r.comment || "",
        date: new Date(r.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
      })),
      reviewsCount: product.reviews.length
    };

    return NextResponse.json({ product: mappedProduct, source: "database" });
  } catch (error) {
    console.error("Critical Failure in Ritual Fetch:", error);
    return NextResponse.json({ 
      error: "Ritual lookup failed. Science is momentarily obscured.",
      detail: (error as Error).message
    }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, price, category, stock, images, ingredients, usage } = await request.json();

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        images,
        ingredients,
        usage
      }
    });

    return NextResponse.json({ product, source: "database" });
  } catch (error) {
    console.error("Failed to update ritual:", error);
    return NextResponse.json({ error: "Failed to update ritual" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ message: "Ritual removed from legacy" });
  } catch (error) {
    console.error("Failed to delete ritual:", error);
    return NextResponse.json({ error: "Failed to delete ritual" }, { status: 500 });
  }
}
