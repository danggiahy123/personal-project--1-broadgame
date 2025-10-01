const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Catan",
    description: "Catan là một board game chiến thuật kinh điển nơi người chơi xây dựng các khu định cư, thành phố và đường xá trên đảo Catan. Người chơi thu thập tài nguyên để xây dựng và mở rộng lãnh thổ của mình.",
    shortDescription: "Board game chiến thuật kinh điển về xây dựng và thương mại",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 450000,
    originalPrice: 600000,
    category: "board-game",
    brand: "Catan Studio",
    stock: 25,
    isFlashSale: true,
    isFeatured: true,
    isActive: true,
    tags: ["chiến thuật", "thương mại", "xây dựng"],
    specifications: {
      players: { min: 3, max: 4 },
      age: { min: 10, max: 99 },
      duration: 90,
      difficulty: "medium"
    },
    ratings: {
      average: 4.5,
      count: 128
    },
    sales: {
      totalSold: 45,
      revenue: 20250000
    }
  },
  {
    name: "Ticket to Ride",
    description: "Ticket to Ride là một board game về đường sắt nơi người chơi thu thập thẻ màu để xây dựng các tuyến đường sắt kết nối các thành phố trên bản đồ.",
    shortDescription: "Board game về đường sắt với gameplay đơn giản và thú vị",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 380000,
    originalPrice: 450000,
    category: "board-game",
    brand: "Days of Wonder",
    stock: 18,
    isFlashSale: false,
    isFeatured: true,
    isActive: true,
    tags: ["đường sắt", "du lịch", "chiến thuật"],
    specifications: {
      players: { min: 2, max: 5 },
      age: { min: 8, max: 99 },
      duration: 60,
      difficulty: "easy"
    },
    ratings: {
      average: 4.3,
      count: 95
    },
    sales: {
      totalSold: 32,
      revenue: 12160000
    }
  },
  {
    name: "Pandemic",
    description: "Pandemic là một board game hợp tác nơi người chơi làm việc cùng nhau để ngăn chặn sự lây lan của các căn bệnh trên thế giới.",
    shortDescription: "Board game hợp tác về ngăn chặn đại dịch",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 520000,
    originalPrice: 650000,
    category: "strategy",
    brand: "Z-Man Games",
    stock: 12,
    isFlashSale: true,
    isFeatured: false,
    isActive: true,
    tags: ["hợp tác", "chiến thuật", "đại dịch"],
    specifications: {
      players: { min: 2, max: 4 },
      age: { min: 13, max: 99 },
      duration: 75,
      difficulty: "hard"
    },
    ratings: {
      average: 4.7,
      count: 87
    },
    sales: {
      totalSold: 28,
      revenue: 14560000
    }
  },
  {
    name: "Splendor",
    description: "Splendor là một board game về phát triển kinh doanh nơi người chơi thu thập đá quý để mua các mỏ và xây dựng đế chế thương mại.",
    shortDescription: "Board game về phát triển kinh doanh với đá quý",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 320000,
    originalPrice: 400000,
    category: "strategy",
    brand: "Asmodee",
    stock: 22,
    isFlashSale: false,
    isFeatured: true,
    isActive: true,
    tags: ["kinh doanh", "đá quý", "chiến thuật"],
    specifications: {
      players: { min: 2, max: 4 },
      age: { min: 10, max: 99 },
      duration: 45,
      difficulty: "medium"
    },
    ratings: {
      average: 4.2,
      count: 76
    },
    sales: {
      totalSold: 19,
      revenue: 6080000
    }
  },
  {
    name: "Azul",
    description: "Azul là một board game về nghệ thuật mosaic nơi người chơi thu thập và sắp xếp các viên gạch màu để tạo ra những tác phẩm nghệ thuật đẹp mắt.",
    shortDescription: "Board game về nghệ thuật mosaic với gameplay độc đáo",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 350000,
    originalPrice: 420000,
    category: "puzzle",
    brand: "Plan B Games",
    stock: 15,
    isFlashSale: false,
    isFeatured: false,
    isActive: true,
    tags: ["nghệ thuật", "mosaic", "puzzle"],
    specifications: {
      players: { min: 2, max: 4 },
      age: { min: 8, max: 99 },
      duration: 45,
      difficulty: "medium"
    },
    ratings: {
      average: 4.6,
      count: 112
    },
    sales: {
      totalSold: 24,
      revenue: 8400000
    }
  },
  {
    name: "Wingspan",
    description: "Wingspan là một board game về chim nơi người chơi thu thập và quản lý các loài chim khác nhau trong các môi trường sống tự nhiên.",
    shortDescription: "Board game về chim với thiết kế đẹp mắt và gameplay thú vị",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 680000,
    originalPrice: 850000,
    category: "strategy",
    brand: "Stonemaier Games",
    stock: 8,
    isFlashSale: true,
    isFeatured: true,
    isActive: true,
    tags: ["chim", "thiên nhiên", "chiến thuật"],
    specifications: {
      players: { min: 1, max: 5 },
      age: { min: 10, max: 99 },
      duration: 90,
      difficulty: "medium"
    },
    ratings: {
      average: 4.8,
      count: 156
    },
    sales: {
      totalSold: 35,
      revenue: 23800000
    }
  },
  {
    name: "Codenames",
    description: "Codenames là một party game nơi người chơi chia thành hai đội và cố gắng đoán các từ khóa dựa trên gợi ý từ đồng đội.",
    shortDescription: "Party game về đoán từ khóa với gameplay vui nhộn",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 180000,
    originalPrice: 220000,
    category: "party",
    brand: "Czech Games",
    stock: 30,
    isFlashSale: false,
    isFeatured: false,
    isActive: true,
    tags: ["party", "đoán từ", "teamwork"],
    specifications: {
      players: { min: 4, max: 8 },
      age: { min: 14, max: 99 },
      duration: 30,
      difficulty: "easy"
    },
    ratings: {
      average: 4.4,
      count: 203
    },
    sales: {
      totalSold: 67,
      revenue: 12060000
    }
  },
  {
    name: "7 Wonders",
    description: "7 Wonders là một board game về xây dựng các kỳ quan thế giới nơi người chơi phát triển nền văn minh của mình qua các thời đại.",
    shortDescription: "Board game về xây dựng kỳ quan thế giới",
    images: ["https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400"],
    price: 480000,
    originalPrice: 600000,
    category: "strategy",
    brand: "Repos Production",
    stock: 14,
    isFlashSale: true,
    isFeatured: true,
    isActive: true,
    tags: ["kỳ quan", "văn minh", "chiến thuật"],
    specifications: {
      players: { min: 3, max: 7 },
      age: { min: 10, max: 99 },
      duration: 60,
      difficulty: "medium"
    },
    ratings: {
      average: 4.5,
      count: 134
    },
    sales: {
      totalSold: 41,
      revenue: 19680000
    }
  }
];

async function seedProducts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/broadgame', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('🌱 Seeded sample products');

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding function
seedProducts();
