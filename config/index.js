import "dotenv/config";

export const config = {
  baseUrl: process.env.BASE_URL || "https://restful-booker.herokuapp.com",
  credentials: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  timeout: 30000,
};

export const endpoints = {
  auth: "/auth",
  booking: "/booking",
  bookingById: (id) => `/booking/${id}`,
};
