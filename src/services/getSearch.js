import axios from "axios";

const getData = (jsonString) => {
  const jsonArray = jsonString.split("}\n");
  jsonArray.pop();

  const jsonObjects = jsonArray.map((json) => {
    try {
      return JSON.parse(json + "}");
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  });
  return jsonObjects;
};

const getSearch = async (query) => {
  const response = await axios.post(
    "https://torre.ai/api/entities/_searchStream",
    {
      query: query,
      identityType: "person",
      limit: 10,
    }
  );

  return getData(response.data);
};

export default getSearch;
