// Setting up env variables
require("dotenv").config();
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: ".env.production.local" });
} else {
  require("dotenv").config({ path: ".env.development.local" });
}
