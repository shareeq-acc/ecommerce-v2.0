import crypto from "crypto";
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function generateRandomCharacters(){
    return crypto.randomBytes(4).toString("hex")
}
console.log(generateRandomCharacters())
// console.log(slugify("razer - viper-@$34534/55435  ---- MINI-- "));
