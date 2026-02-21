import { prisma } from "@/lib/prisma";

const products = [
  {
    name: "iPhone 15 Pro",
    description: "The ultimate iPhone with Titanium design and A17 Pro chip.",
    price: 999,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 1240,
    isTrending: true
  },
  {
    name: "MacBook Air M2",
    description: "Strikingly thin and fast so you can work, play, or create anywhere.",
    price: 1199,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 850,
    isTrending: true
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise canceling with exceptional sound quality.",
    price: 399,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 2100,
    isTrending: true
  },
  {
    name: "Apple Watch Series 9",
    description: "Smarter, brighter, and more powerful than ever.",
    price: 399,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1544117518-30dd5ff7a9bd?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 560,
    isTrending: false
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "The ultimate Galaxy AI experience with a stunning 200MP camera.",
    price: 1299,
    category: "Smartphones",
    image: "https://images.unsplash.com/photo-1707251859187-b952f418d1a1?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 920,
    isTrending: true
  },
  {
    name: "Dell XPS 13",
    description: "Powerful performance in a stunningly compact design.",
    price: 999,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 430,
    isTrending: false
  }
];

const orders = [
  { customer: "John Doe", email: "john@example.com", product: "iPhone 15 Pro", amount: 999.00, status: "Pending", method: "10% Advance" },
  { customer: "Alice Smith", email: "alice@example.com", product: "MacBook Air M2", amount: 1199.00, status: "Shipped", method: "Full Payment" },
  { customer: "Bob Wilson", email: "bob@example.com", product: "Sony WH-1000XM5", amount: 399.00, status: "Delivered", method: "10% Advance" },
  { customer: "Emma Davis", email: "emma@example.com", product: "Apple Watch Series 9", amount: 399.00, status: "Cancelled", method: "Full Payment" },
  { customer: "Chris Brown", email: "chris@example.com", product: "Samsung Galaxy S24 Ultra", amount: 1299.00, status: "Processing", method: "20% Advance" },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();

  // Create products
  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }
  console.log(`Created ${products.length} products`);

  // Create orders
  const dbProducts = await prisma.product.findMany();
  for (const order of orders) {
    const product = dbProducts.find(p => p.name === order.product);
    if (product) {
      await prisma.order.create({
        data: {
          customer: order.customer,
          email: order.email,
          product: order.product,
          amount: order.amount,
          status: order.status,
          method: order.method,
          items: {
            create: {
              productId: product.id,
              quantity: 1,
              price: order.amount
            }
          }
        }
      });
    }
  }
  console.log(`Created ${orders.length} orders`);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
