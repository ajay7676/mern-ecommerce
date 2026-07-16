
export const dashboardStats = [
  {
    id: 1,
    columns: [
      {
        title: "Impressions: 03 Jul",
        value: "21.5K",
        subtitle: "02 Jul: 26.1K",
      },
      {
        title: "Today's Units",
        value: "27",
        subtitle: "Yesterday's total: 72",
      },
      {
        title: "Today's Sales",
        value: "₹10.4K",
        subtitle: "Yesterday's total: ₹25.4K",
      },
    ],
  },
  {
    id: 2,
    columns: [
      {
        title: "New Orders",
        value: "0",
        subtitle: "Pending RTD: 0",
      },
      {
        title: "Today's Returns",
        value: "0",
        subtitle: "Handed over: 0",
      },
    ],
  },
  {
    id: 3,
    columns: [
      {
        title: "Upcoming Payment",
        value: "₹14.8K",
        subtitle: "Due Tomorrow",
      },
    ],
  },
];

// src/data/dashboardWidgets.js

export const whatsNew = {
  title: "What's New",
  description: "Monitor competition hassle-free!",
  buttonText: "Track Now",
  image:
    "https://placehold.co/600x320/6B21A8/FFFFFF?text=Competition+Tracker",
};

export const criticalAction = {
  title: "Critical Account Actions",
  alert: {
    message:
      "2/2 GSTIN not enabled for E-invoicing. Enable E-Invoicing to unlock Business Sales.",
    action: "Onboard now",
  },
};

export const settlementHub = {
  title: "Settlement Hub",

  badge: "Top Discount of Sale",

  value: "+3",

  heading: "Flipkart GOAT Sale, 03 Jul - 09 Jul",

  description:
    "Win Value tags on 38+ Listings to boost business during the GOAT Sale.",

  image:
    "https://placehold.co/180x180/8B5CF6/FFFFFF?text=GOAT+SALE",
};

export const adRecommendation = {
  title: "Ad Recommendations",

  heading: "Create ROI Optimised Campaign",

  subtitle: "Up to average ROI of 8",

  action: "Quick Campaign",

  graph: "https://placehold.co/320x120/F5F7FB/6B7280?text=Performance+Chart",
};

export const customerInsight = {
  title: "Customer",

  listings: 87,

  additionalInfo: "Additional Images Missing",

  product: "Product Quality",

  arrowText: "View",
};