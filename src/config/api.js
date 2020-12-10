import axios from "axios";

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};
export const urlAsset = {
  //dev
  avatar: "http://localhost:5000/public/avatars/",
  thumbnailParentCard: "http://localhost:5000/public/thumbnailParentCards/",
  thumbnailChildCard: "http://localhost:5000/public/thumbnailChildCards/",
  //production
  photo: "https://res.cloudinary.com/rizkyiqbal/",
};
export const API = axios.create({
  //dev
  baseURL: "http://localhost:5000/api/v1",
  //production
  //baseURL: "https://mytodo-be.herokuapp.com/api/v1",
});
