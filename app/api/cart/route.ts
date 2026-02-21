import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, productId, quantity = 1 } = body;

    if (!sessionId || !productId) {
      return NextResponse.json(
        { error: "Session ID and Product ID required" },
        { status: 400 }
      );
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        sessionId_productId: {
          sessionId,
          productId: parseInt(productId),
        },
      },
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
      return NextResponse.json(updatedItem);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        sessionId,
        productId: parseInt(productId),
        quantity,
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, productId, quantity } = body;

    if (!sessionId || !productId) {
      return NextResponse.json(
        { error: "Session ID and Product ID required" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({
        where: {
          sessionId_productId: {
            sessionId,
            productId: parseInt(productId),
          },
        },
      });
      return NextResponse.json({ success: true });
    }

    const cartItem = await prisma.cartItem.update({
      where: {
        sessionId_productId: {
          sessionId,
          productId: parseInt(productId),
        },
      },
      data: { quantity },
      include: {
        product: true,
      },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const productId = searchParams.get("productId");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    if (productId) {
      await prisma.cartItem.delete({
        where: {
          sessionId_productId: {
            sessionId,
            productId: parseInt(productId),
          },
        },
      });
    } else {
      await prisma.cartItem.deleteMany({
        where: { sessionId },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
