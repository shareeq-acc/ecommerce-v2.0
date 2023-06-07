import DatauriParser from "datauri/parser.js";
const parser = new DatauriParser();

const bufferToUrl = (fileFormat, fileBuffer) => {
  return parser.format(fileFormat, fileBuffer);
};

export default bufferToUrl;
