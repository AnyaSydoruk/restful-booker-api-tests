export function buildBooking(overrides = {}) {
  return {
    firstname: "Ann",
    lastname: "Sid",
    totalprice: 150,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-09-01",
      checkout: "2026-09-07",
    },
    additionalneeds: "Breakfast",
    ...overrides,
  };
}
