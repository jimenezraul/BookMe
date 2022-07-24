const client = require("../Client");
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const router = require("express").Router();

// All Services
router.get("/", async (req, res) => {
  try {
    const response = await client.catalogApi.searchCatalogItems({
      productTypes: ["APPOINTMENTS_SERVICE"],
    });

    const services = response.result.items;

    res.send(services);
  } catch (error) {
    console.log(error);
  }
});

// Service by member id
router.get("/:memberId", async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const response = await client.catalogApi.searchCatalogItems({
      productTypes: ["APPOINTMENTS_SERVICE"],
    });

    const filtered = response.result.items.filter((item) =>
      item.itemData.variations.some((variation) =>
        variation.itemVariationData.teamMemberIds.includes(memberId)
      )
    );

    res.send(filtered);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
