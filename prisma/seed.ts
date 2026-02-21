import { prisma } from "@/lib/prisma";

const categoriesData = [
  {
    id: "audio",
    name: "Audio Devices & Accessories",
    products: [
      { name: "Airbuds Covers", purchasePrice: null, retailPrice: null },
      { name: "Airbuds with Covers", purchasePrice: 1000, retailPrice: null },
      { name: "Airbuds Pack (China CS)", purchasePrice: 1000, retailPrice: null },
      { name: "Xiberia W3 Airbuds", purchasePrice: null, retailPrice: null },
      { name: "Airpods Pro 2", purchasePrice: 1000, retailPrice: null },
      { name: "Samsung Galaxy Buds Pro", purchasePrice: 1400, retailPrice: null },
      { name: "LAAT Handfrees", purchasePrice: null, retailPrice: null },
      { name: "Boat HP11 Wireless Handfrees", purchasePrice: null, retailPrice: null },
      { name: "LAVA Mic", purchasePrice: null, retailPrice: null },
      { name: "BM-800 V-10 (Podcast Mic)", purchasePrice: null, retailPrice: null },
      { name: "Podcast Mic Set", purchasePrice: 8500, retailPrice: null },
      { name: "Wireless Mic + Recharger", purchasePrice: null, retailPrice: null },
      { name: "Astro A10 Gaming Headset", purchasePrice: null, retailPrice: null }
    ]
  },
  {
    id: "speakers",
    name: "Speakers & Sound Systems",
    products: [
      { name: "Speakers", purchasePrice: null, retailPrice: null },
      { name: "Loud Speaker (S11)", purchasePrice: null, retailPrice: null },
      { name: "RGB Speaker", purchasePrice: null, retailPrice: null },
      { name: "JBL Speakers", purchasePrice: null, retailPrice: null },
      { name: "Boss Speakers", purchasePrice: null, retailPrice: null }
    ]
  },
  {
    id: "power",
    name: "Power & Charging Devices",
    products: [
      { name: "Power Bank (20000 MAH)", purchasePrice: null, retailPrice: null },
      { name: "Power Bank (10000 MAH)", purchasePrice: null, retailPrice: null },
      { name: "Power Bank (12000 MAH)", purchasePrice: null, retailPrice: null },
      { name: "Wireless Power Bank 2100", purchasePrice: null, retailPrice: null }
    ]
  },
  {
    id: "mobile_accessories",
    name: "Mobile Accessories",
    products: [
      { name: "Car Phone Holder", purchasePrice: null, retailPrice: null },
      { name: "Metal Mobile Stand", purchasePrice: null, retailPrice: null },
      { name: "Mobile Magnetic Holder", purchasePrice: 800, retailPrice: null },
      { name: "PF-4J Ring + Stand", purchasePrice: null, retailPrice: null },
      { name: "Laptop Stand", purchasePrice: null, retailPrice: null },
      { name: "Portable Cigarette Lighter", purchasePrice: null, retailPrice: null }
    ]
  },
  {
    id: "tripods_lighting",
    name: "Tripods, Stands & Lighting",
    products: [
      { name: "BX-385 Flex Tripod", purchasePrice: null, retailPrice: null },
      { name: "BX-330 Flexible Tripod", purchasePrice: null, retailPrice: null },
      { name: "BX-338 Flexible Tripod", purchasePrice: null, retailPrice: null },
      { name: "BX-611 Flexible Tripod", purchasePrice: null, retailPrice: null },
      { name: "BX-331 Flexible Tripod", purchasePrice: null, retailPrice: null },
      { name: "310 Flexible Tripod", purchasePrice: null, retailPrice: null },
      { name: "BX-611 Selfie Stick + Tripod", purchasePrice: null, retailPrice: null },
      { name: "Tripod with Mobile Holder", purchasePrice: 1200, retailPrice: null },
      { name: "7ft Aluminium Tripod Stand", purchasePrice: null, retailPrice: null },
      { name: "Ring Light Dimmable (3 Color Mode)", purchasePrice: null, retailPrice: null }
    ]
  },
  {
    id: "bike_outdoor",
    name: "Bike & Outdoor Accessories",
    products: [
      { name: "Bulls Metal Bike Mobile Holder", purchasePrice: 1000, retailPrice: null }
    ]
  },
  {
    id: "networking",
    name: "Networking Devices",
    products: [
      { name: "WPG10 Original Router", purchasePrice: null, retailPrice: null }
    ]
  },
  {
    id: "decor",
    name: "Decor & Utility Gadgets",
    products: [
      { name: "Night-Ball Lamp (Galaxy)", purchasePrice: 600, retailPrice: null }
    ]
  },
  {
    id: "wearables",
    name: "Wearable Tech",
    products: [
      { name: "Apple Watch Series 11", purchasePrice: 2600, retailPrice: null }
    ]
  }
];

async function main() {
  console.log("Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (const category of categoriesData) {
    await prisma.category.create({
      data: {
        id: category.id,
        name: category.name
      }
    });
  }

  for (const category of categoriesData) {
    for (const product of category.products) {
      await prisma.product.create({
        data: {
          name: product.name,
          purchasePrice: product.purchasePrice,
          retailPrice: product.retailPrice,
          categoryId: category.id
        }
      });
    }
  }

  console.log(`Created ${categoriesData.length} categories`);
  const totalProducts = categoriesData.reduce((acc, cat) => acc + cat.products.length, 0);
  console.log(`Created ${totalProducts} products`);
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
