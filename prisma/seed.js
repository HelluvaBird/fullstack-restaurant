const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    slug: 'pastas',
    title: 'Italian Pastas',
    description:
      'Savor the taste of perfection with our exquisite Italian handmade pasta menu.',
    img: '/images/m1.png',
    color: 'white',
  },
  {
    slug: 'burgers',
    title: 'Juicy Burgers',
    description:
      'Burger Bliss: Juicy patties, bold flavors, and gourmet toppings galore.',
    img: '/images/m2.png',
    color: 'black',
  },
  {
    slug: 'pizzas',
    title: 'Cheesy Pizzas',
    description:
      'Pizza Paradise: Irresistible slices, mouthwatering toppings, and cheesy perfection.',
    img: '/images/m3.png',
    color: 'white',
  },
];

const products = [
  {
    title: 'Sicilian',
    description:
      'Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.',
    img: '/images/p1.png',
    price: 2490,
    isFeatured: true,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Bacon Deluxe',
    description:
      'Indulge in smoky goodness with a flame-grilled beef patty, topped with crispy bacon, melted cheddar cheese, caramelized onions, and a smattering of tangy BBQ sauce.',
    img: '/images/p2.png',
    price: 2990,
    isFeatured: true,
    categorySlug: 'burgers',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Bella Napoli',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    img: '/images/p3.png',
    price: 2490,
    isFeatured: true,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Spicy Arrabbiata',
    description:
      'Ignite your taste buds with this fiery pasta creation, combining penne in a spicy tomato sauce infused with garlic, red chili flakes, and fresh basil for the ultimate comfort food experience.',
    img: '/images/p4.png',
    price: 2690,
    isFeatured: true,
    categorySlug: 'pastas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Jalapeño Fiesta',
    description:
      'Ignite your taste buds with a fiery kick! This burger features a succulent beef patty, fiery jalapeños, pepper jack cheese, and a zesty chipotle mayo sauce , and all the classic fixings on a toasted bun.',
    img: '/images/p5.png',
    price: 2990,
    isFeatured: true,
    categorySlug: 'burgers',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Margherita Magic',
    description:
      'A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil, creamy mozzarella, and a drizzle of extra virgin olive oil, fresh arugula, and a drizzle of balsamic glaze.',
    img: '/images/p6.png',
    price: 2490,
    isFeatured: true,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Garlic Parmesan Linguine',
    description:
      "A garlic lover's delight, featuring linguine smothered in a creamy Parmesan sauce, infused with garlic and garnished with chopped parsley, bell peppers, and cherry tomatoes.",
    img: '/images/p7.png',
    price: 2890,
    isFeatured: true,
    categorySlug: 'pastas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Mediterranean Delight',
    description:
      'Embark on a culinary journey with this Mediterranean-inspired creation, featuring zesty feta cheese, Kalamata olives, sun-dried tomatoes, and a sprinkle of oregano.',
    img: '/images/p8.png',
    price: 3290,
    isFeatured: true,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Hawaiian Teriyaki',
    description:
      'Experience a taste of the tropics with a juicy beef patty glazed in tangy teriyaki sauce, topped with grilled pineapple, crispy bacon, and fresh lettuce, and all the classic fixings on a toasted bun.',
    img: '/images/p9.png',
    price: 2990,
    isFeatured: true,
    categorySlug: 'burgers',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Pesto Primavera',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    img: '/images/p10.png',
    price: 2890,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Veggie Supreme',
    description:
      'A classic Italian delight featuring a thin, crispy crust, tangy tomato sauce, fresh mozzarella, and a medley of aromatic herbs topped with lettuce, tomatoes, and a dollop of tangy mayo.',
    img: '/images/p11.png',
    price: 2490,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
  {
    title: 'Four Cheese Fantasy',
    description:
      'Experience pure cheesy bliss with a melty blend of mozzarella, cheddar, provolone, and Parmesan cheeses, creating a rich and indulgent pizza experience.',
    img: '/images/p12.png',
    price: 2290,
    categorySlug: 'pizzas',
    options: [
      {
        title: 'Small',
        additionalPrice: 0,
      },
      {
        title: 'Medium',
        additionalPrice: 4,
      },
      {
        title: 'Large',
        additionalPrice: 6,
      },
    ],
  },
];

async function seedCategories() {
  try {
    await prisma.category.createMany({
      data: categories,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedProducts() {
  try {
    await prisma.product.createMany({
      data: products,
    });
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

//seedCategories();
seedProducts();
