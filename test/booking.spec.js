import { expect } from "chai";
import { apiClient } from "../helpers/api.client.js";
import { getAuthToken } from "../helpers/auth.helper.js";
import { endpoints } from "../config/index.js";
import { buildBooking } from "../data/booking.data.js";

describe("Booking API", () => {
  let token;

  before(async () => {
    token = await getAuthToken();
  });

  describe("POST /booking", () => {
    it("should create a new booking", async () => {
      const payload = buildBooking();

      const response = await apiClient.post(endpoints.booking, {
        body: payload,
      });

      expect(response.status).to.equal(200);
      expect(response.headers.get("content-type")).to.include(
        "application/json",
      );
      expect(response.body).to.have.property("bookingid").that.is.a("number");
      expect(response.body.booking).to.deep.equal(payload);
    });
  });

  describe("Operations on an existing booking", () => {
    let bookingId;
    let createdBooking;

    beforeEach(async () => {
      createdBooking = buildBooking();

      const response = await apiClient.post(endpoints.booking, {
        body: createdBooking,
      });

      bookingId = response.body.bookingid;
    });

    it("should return the booking by id", async () => {
      const response = await apiClient.get(endpoints.bookingById(bookingId));

      expect(response.status).to.equal(200);
      expect(response.headers.get("content-type")).to.include(
        "application/json",
      );
      expect(response.body).to.deep.equal(createdBooking);
    });

    it("should update the booking", async () => {
      const updatedBooking = buildBooking({
        firstname: "Updated",
        totalprice: 500,
        depositpaid: false,
      });

      const response = await apiClient.put(endpoints.bookingById(bookingId), {
        body: updatedBooking,
        token,
      });

      expect(response.status).to.equal(200);
      expect(response.headers.get("content-type")).to.include(
        "application/json",
      );
      expect(response.body).to.deep.equal(updatedBooking);
    });

    it("should delete the booking", async () => {
      const response = await apiClient.delete(
        endpoints.bookingById(bookingId),
        {
          token,
        },
      );

      expect(response.status).to.equal(201);
      expect(response.headers.get("content-type")).to.include("text/plain");
      expect(response.body).to.equal("Created");

      const getResponse = await apiClient.get(endpoints.bookingById(bookingId));
      expect(getResponse.status).to.equal(404);
    });
  });
});
