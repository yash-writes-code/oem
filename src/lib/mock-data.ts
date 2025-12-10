// Mock data for the LG OEM Portal

export interface WarrantyData {
  id: string
  customerName: string
  productName: string
  productType: string
  warrantyExpiry: string
  proofOfWarranty: string
  lastServiceDate: string
  status: "active" | "expired" | "expiring"
  company: string
}

export interface ServiceData {
  id: string
  date: string
  services: number
  cost: number
  rating: number
}

export interface WorkerData {
  id: string
  name: string
  company: string
  rating: number
  servicesCompleted: number
  responseTime: number
  availability: boolean
}

export interface VulnerableProduct {
  name: string
  serviceCount: number
  cost: number
}

// Generate random warranty data for realistic volume
const generateWarrantyData = () => {
  const customerNames = [
    "Amit Sharma", "Priya Singh", "Rohan Verma", "Sneha Patel", "Vikram Desai",
    "Kavya Reddy", "Arjun Kumar", "Meera Nair", "Rajesh Gupta", "Ananya Joshi",
    "Siddharth Agarwal", "Pooja Yadav", "Manish Tiwari", "Ritu Bhatt", "Karan Malhotra",
    "Divya Iyer", "Aakash Pandey", "Shreya Chawla", "Nikhil Saxena", "Deepika Rao",
    "Varun Kapoor", "Ishita Bansal", "Rohit Sinha", "Aditi Mehta", "Gaurav Mishra",
    "Neha Agrawal", "Aarav Jain", "Riya Shah", "Harsh Varma", "Smriti Dixit",
    "Abhishek Khanna", "Nisha Goyal", "Vivek Aggarwal", "Tanvi Chopra", "Ashwin Dubey",
    "Kritika Bajaj", "Shubham Goel", "Payal Mittal", "Ayush Bhatia", "Preeti Kohli",
    "Rishabh Singhal", "Anjali Shukla", "Samarth Jindal", "Swati Tyagi", "Yash Choudhary",
    "Aparna Sethi", "Mohit Sharma", "Simran Bedi", "Tushar Pathak", "Aarti Srivastava",
    "Kartik Rastogi", "Prachi Arora", "Nitin Khurana", "Sakshi Garg", "Rahul Bhardwaj",
    "Megha Bajpai", "Aryan Chauhan", "Rhea Mallik", "Saurabh Jha", "Akshara Gupta",
    "Pratyush Kumar", "Pallavi Sharma", "Deven Ahluwalia", "Madhavi Sood", "Ankit Tomar",
    "Shraddha Verma", "Chirag Soni", "Isha Rana", "Mayank Dhawan", "Bhavya Aggarwal",
    "Shrey Mathur", "Vidya Kaul", "Pranav Mittal", "Anushka Jain", "Akash Bhatt",
    "Nikita Gupta", "Vaibhav Singh", "Kriti Sharma", "Arpit Agrawal", "Snehal Nair",
    "Dhruv Kapoor", "Tanya Mishra", "Karthik Reddy", "Pooja Singh", "Rachit Goel",
    "Anjana Pillai", "Arnav Chandra", "Priyanka Verma", "Shashank Dubey", "Kavita Joshi",
    "Dev Patel", "Manisha Yadav", "Akshay Tiwari", "Rashmi Bhatt", "Yuvraj Malhotra",
    "Anita Iyer", "Sahil Pandey", "Swara Chawla", "Hitesh Saxena", "Deepti Rao"
  ];

  const productNames = [
    "LG InstaView Door-in-Door Refrigerator",
    "LG Smart Inverter Refrigerator",
    "LG TwinWash Washing Machine",
    "LG Inverter Direct Drive Washing Machine",
    "LG PuriCare Air Purifier",
    "LG PuriCare Water Purifier",
    "LG Styler Steam Clothing Care",
    "LG NeoChef Microwave Oven",
    "LG CordZero A9 Stick Vacuum Cleaner",
    "LG Robot Vacuum Cleaner (RoboKing)",
    "LG Tromm Front Load Washer",
    "LG TurboWash 360 Washer",
    "LG Dual Inverter Air Conditioner",
    "LG Artcool Air Conditioner",
    "LG Chef Collection Range Oven",
    "LG Cold Pressed Juicer",
    "LG Smart Induction Cooktop",
    "LG Convection Microwave Oven",
    "LG Portable Air Purifier",
    "LG Dehumidifier",
    "LG Built-in Dishwasher",
    "LG Steam Iron",
    "LG Hand Blender",
    "LG Pop-Up Toaster",
    "LG Atta & Bread Maker",
    "LG Smart Refrigerator with ThinQ",
    "LG UV-C Sanitizer Box",
    "LG Water Softener",
    "LG Compact Vacuum Cleaner",
    "LG Multi-Functional Oven"
  ];

  const productTypes = ["Refrigerator", "Washing Machine", "Air Purifier", "Vacuum Cleaner", "Kitchen Appliance", "Water Purifier", "AC", "Home Appliance"];
  
  const statuses: ("active" | "expired" | "expiring")[] = ["active", "expired", "expiring"];

  const data: WarrantyData[] = [];

  for (let i = 1; i <= 120; i++) {
    const randomCustomer = customerNames[Math.floor(Math.random() * customerNames.length)];
    const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
    
    let randomType = productTypes[Math.floor(Math.random() * productTypes.length)];

    // Infer product type from product name (LG-specific keywords)
    const p = randomProduct.toLowerCase();
    if (p.includes("refrigerator") || p.includes("fridge") || p.includes("instaview")) {
      randomType = "Refrigerator";
    } else if (p.includes("wash") || p.includes("washer") || p.includes("tromm")) {
      randomType = "Washing Machine";
    } else if (p.includes("air purifier") || p.includes("puricare") || p.includes("air conditioner") || p.includes("ac") || p.includes("artcool")) {
      randomType = p.includes("ac") || p.includes("air conditioner") || p.includes("artcool") ? "AC" : "Air Purifier";
    } else if (p.includes("vacuum") || p.includes("cordzero") || p.includes("robot")) {
      randomType = "Vacuum Cleaner";
    } else if (p.includes("water purifier") || p.includes("puri") || p.includes("water softener")) {
      randomType = "Water Purifier";
    } else {
      randomType = "Kitchen Appliance";
    }

    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate random dates
    const warrantyStart = new Date(2022, Math.floor(Math.random() * 36), Math.floor(Math.random() * 28) + 1);
    const warrantyExpiry = new Date(warrantyStart.getTime() + (Math.random() * 4 + 1) * 365 * 24 * 60 * 60 * 1000);
    const lastService = new Date(warrantyStart.getTime() + Math.random() * (Date.now() - warrantyStart.getTime()));

    // Adjust status based on expiry date
    let finalStatus = randomStatus;
    const now = new Date();
    const daysUntilExpiry = (warrantyExpiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysUntilExpiry < 0) {
      finalStatus = "expired";
    } else if (daysUntilExpiry < 60) {
      finalStatus = "expiring";
    } else {
      finalStatus = "active";
    }

    data.push({
      id: i.toString(),
      customerName: randomCustomer,
      productName: randomProduct,
      productType: randomType,
      warrantyExpiry: warrantyExpiry.toISOString().split('T')[0],
      proofOfWarranty: `lg_warranty_${String(i).padStart(3, '0')}.pdf`,
      lastServiceDate: lastService.toISOString().split('T')[0],
      status: finalStatus,
      company: "LG"
    });
  }

  return data;
};

// Mock warranty data - All products from LG (OEM Company)
export const warrantyData: WarrantyData[] = generateWarrantyData();

// Mock service analytics data
export const serviceAnalyticsData: ServiceData[] = [
  { id: "1", date: "2024-01-01", services: 45, cost: 12500, rating: 4.2 },
  { id: "2", date: "2024-01-02", services: 52, cost: 14200, rating: 4.1 },
  { id: "3", date: "2024-01-03", services: 38, cost: 9800, rating: 4.4 },
  { id: "4", date: "2024-01-04", services: 61, cost: 16700, rating: 4.0 },
  { id: "5", date: "2024-01-05", services: 49, cost: 13100, rating: 4.3 },
  { id: "6", date: "2024-01-06", services: 44, cost: 11900, rating: 4.2 },
  { id: "7", date: "2024-01-07", services: 56, cost: 15300, rating: 4.1 }
]

// Mock worker data - All from companies serving LG (expanded)
export const workerData: WorkerData[] = [
  {
    id: "1",
    name: "Rahul Mehra",
    company: "LG Service Center",
    rating: 4.8,
    servicesCompleted: 245,
    responseTime: 12,
    availability: true
  },
  {
    id: "2",
    name: "Neha Gupta",
    company: "LG Authorized Service",
    rating: 4.9,
    servicesCompleted: 189,
    responseTime: 8,
    availability: true
  },
  {
    id: "3",
    name: "Suresh Kumar",
    company: "LG Service Partner",
    rating: 4.6,
    servicesCompleted: 312,
    responseTime: 15,
    availability: false
  },
  {
    id: "4",
    name: "Pooja Nair",
    company: "LG TechCare",
    rating: 4.7,
    servicesCompleted: 156,
    responseTime: 10,
    availability: true
  },
  {
    id: "5",
    name: "Manoj Joshi",
    company: "LG Service Hub",
    rating: 4.5,
    servicesCompleted: 203,
    responseTime: 18,
    availability: true
  },
  {
    id: "6",
    name: "Arjun Patel",
    company: "LG Service Center",
    rating: 4.4,
    servicesCompleted: 178,
    responseTime: 14,
    availability: true
  },
  {
    id: "7",
    name: "Kavya Reddy",
    company: "LG Authorized Service",
    rating: 4.8,
    servicesCompleted: 267,
    responseTime: 11,
    availability: false
  },
  {
    id: "8",
    name: "Rajesh Gupta",
    company: "LG TechCare",
    rating: 4.6,
    servicesCompleted: 198,
    responseTime: 13,
    availability: true
  },
  {
    id: "9",
    name: "Ananya Joshi",
    company: "LG Service Partner",
    rating: 4.7,
    servicesCompleted: 234,
    responseTime: 9,
    availability: true
  },
  {
    id: "10",
    name: "Siddharth Agarwal",
    company: "LG Service Hub",
    rating: 4.5,
    servicesCompleted: 156,
    responseTime: 16,
    availability: false
  }
]

// Mock vulnerable products data - All LG products (expanded)
export const vulnerableProducts: VulnerableProduct[] = [
  { name: "LG InstaView Door-in-Door Refrigerator", serviceCount: 82, cost: 124900 },
  { name: "LG TwinWash Washing Machine", serviceCount: 71, cost: 69900 },
  { name: "LG PuriCare Air Purifier", serviceCount: 55, cost: 28900 },
  { name: "LG CordZero A9 Stick Vacuum Cleaner", serviceCount: 48, cost: 52900 },
  { name: "LG Styler Steam Clothing Care", serviceCount: 43, cost: 79900 },
  { name: "LG NeoChef Microwave Oven", serviceCount: 35, cost: 21900 },
  { name: "LG Dual Inverter Air Conditioner", serviceCount: 32, cost: 45900 },
  { name: "LG PuriCare Water Purifier", serviceCount: 30, cost: 19900 },
  { name: "LG Robot Vacuum Cleaner (RoboKing)", serviceCount: 28, cost: 64900 },
  { name: "LG Built-in Dishwasher", serviceCount: 25, cost: 52900 },
  { name: "LG Cold Pressed Juicer", serviceCount: 22, cost: 12900 },
  { name: "LG Water Softener", serviceCount: 18, cost: 25900 }
]

// Mock monthly performance data
export const monthlyPerformanceData = [
  { month: "Jan", services: 1245, cost: 340000, satisfaction: 4.2 },
  { month: "Feb", services: 1189, cost: 325000, satisfaction: 4.3 },
  { month: "Mar", services: 1367, cost: 389000, satisfaction: 4.1 },
  { month: "Apr", services: 1423, cost: 412000, satisfaction: 4.4 },
  { month: "May", services: 1298, cost: 356000, satisfaction: 4.2 },
  { month: "Jun", services: 1456, cost: 445000, satisfaction: 4.3 },
  { month: "Jul", services: 1512, cost: 467000, satisfaction: 4.5 },
  { month: "Aug", services: 1389, cost: 398000, satisfaction: 4.2 },
  { month: "Sep", services: 1467, cost: 423000, satisfaction: 4.4 }
]

// Key metrics (updated for larger dataset)
export const keyMetrics = {
  totalServices: 18750,
  totalCost: 4890000,
  averageRating: 4.3,
  avgResolutionTime: "2.4 hours",
  customerSatisfaction: 92,
  activeWorkers: 186
}

// Warranty distribution by product type for analytics
export const getWarrantyDistribution = () => {
  const distribution: { [key: string]: number } = {};
  
  warrantyData.forEach(warranty => {
    distribution[warranty.productType] = (distribution[warranty.productType] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([productType, count]) => ({
    productType,
    warranties: count,
    percentage: Math.round((count / warrantyData.length) * 100)
  }));
};
