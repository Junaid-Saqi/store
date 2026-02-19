
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    reviews: number;
    isTrending?: boolean;
}

export const CATEGORIES = [
    "All",
    "Smartphones",
    "Laptops",
    "Audio",
    "Wearables",
    "Accessories"
];

export const PRODUCTS: Product[] = [
    {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
        name: "Apple Watch Series 9",
        description: "Smarter, brighter, and more powerful than ever.",
        price: 399,
        category: "Wearables",
        image: "https://images.unsplash.com/photo-1544117518-30dd5ff7a9bd?auto=format&fit=crop&q=80&w=800",
        rating: 4.6,
        reviews: 560
    },
    {
        id: "5",
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
        id: "6",
        name: "Dell XPS 13",
        description: "Powerful performance in a stunningly compact design.",
        price: 999,
        category: "Laptops",
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=800",
        rating: 4.5,
        reviews: 430
    }
];
