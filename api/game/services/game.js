"use strict";

const axios = require("axios");
const slugify = require("slugify");

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const ratingElement = dom.window.document.querySelector(
    ".age-restrictions__icon use"
  );

  const description = dom.window.document.querySelector(".description");

  return {
    rating: ratingElement
      ? ratingElement
          .getAttribute("xlink:href")
          .replace(/_/g, "")
          .replace(/[^\w-]+/g, "")
      : "BR0",
    short_description: description.textContent.trim().slice(0, 160),
    description: description.innerHTML,
  };
}
module.exports = {
  populate: async (params) => {
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const {
      data: { products },
    } = await axios.get(gogApiUrl);

    // await getGameInfo(products[1]);

    await strapi.services.publisher.create({
      name: products[1].publisher,
      slug: slugify(products[1].publisher).toLowerCase(),
    });

    await strapi.services.developer.create({
      name: products[1].developer,
      slug: slugify(products[1].developer).toLowerCase(),
    });

    console.log(products[1]);
  },
};
