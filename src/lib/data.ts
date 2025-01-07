import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "solar.rust@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John Doe",
      email: "test@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Nike Air Max 90",
      slug: "nike-air-max-90",
      image: "/images/nike-air-max-90.jpg",
      banner: "/images/nike-air-max-90-banner.jpg",
      price: 120,
      brand: "Nike",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Running",
      rating: 4.5,
      numReviews: 10,
      countInStock: 5,
      colors: ["Black", "White", "Red"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
    },
    {
      name: "Adidas Superstar",
      slug: "adidas-superstar",
      image: "/images/adidas-superstar.jpg",
      banner: "/images/adidas-superstar-banner.jpg",
      price: 100,
      brand: "Adidas",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Casual",
      rating: 4.0,
      numReviews: 8,
      countInStock: 3,
      colors: ["Black", "White", "Blue"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
      isFeatured: true,
    },
    {
      name: "Vans Old Skool",
      slug: "vans-old-skool",
      image: "/images/vans-old-skool.jpg",
      banner: "/images/vans-old-skool-banner.jpg",
      price: 80,
      brand: "Vans",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Skateboarding",
      rating: 4.5,
      numReviews: 12,
      countInStock: 8,
      colors: ["Black", "White", "Green"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
    },
    {
      name: "Converse Chuck Taylor All Star",
      slug: "converse-chuck-taylor-all-star",
      image: "/images/converse-chuck-taylor-all-star.jpg",
      banner: "/images/converse-chuck-taylor-all-star-banner.jpg",
      price: 60,
      brand: "Converse",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Casual",
      rating: 4.0,
      numReviews: 8,
      countInStock: 3,
      colors: ["Black", "White", "Red"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
      isFeatured: true,
    },
    {
      name: "New Balance 574",
      slug: "new-balance-574",
      image: "/images/new-balance-574.jpg",
      banner: "/images/new-balance-574-banner.jpg",
      price: 90,
      brand: "New Balance",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Running",
      rating: 4.5,
      numReviews: 10,
      countInStock: 5,
      colors: ["Black", "White", "Blue"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
    },
    {
      name: "Puma Suede Classic",
      slug: "puma-suede-classic",
      image: "/images/puma-suede-classic.jpg",
      banner: "/images/puma-suede-classic-banner.png",
      price: 70,
      brand: "Puma",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: "Casual",
      rating: 4.0,
      numReviews: 8,
      countInStock: 3,
      colors: ["Black", "White", "Green"],
      sizes: ["US 7", "US 8", "US 9", "US 10"],
      isFeatured: true,
    },
  ],
};

export default data;
