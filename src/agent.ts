import axios, { AxiosResponse } from "axios";
import { IUser } from "./models/user";
import { toast } from "react-toastify";
import { history } from "../src/App";
import { ITechniqueChart } from "./models/chart";
import { IBlog } from "./models/blog";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const userRegex = /\/user$/;

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure you are connected to the internet!");
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/not-found");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/not-found");
  }
  if (status === 401 || status === 403) {
    history.push("/unauthorized");
  }
  if (status === 500 && userRegex.test(error.config.url)) {
    window.sessionStorage.removeItem("jwt");
    history.push("/");
    toast.info("Your session has expired, please login again.");
  } else if (status === 500) {
    toast.error("Server error - check the terminal for more info!");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const User = {
  current: (): Promise<IUser> => request.get("/user"),
  fbLogin: (accessToken: string) =>
    request.post("/user/facebook", { accessToken }),
  googleLogin: (tokenId: string) => request.post("/user/google", { tokenId }),
};

const TechniqueCharts = {
  list: (): Promise<ITechniqueChart[]> => request.get("/techniquecharts/list"),
  create: (): Promise<ITechniqueChart> =>
    request.post("/techniquecharts/create", {}),
  delete: (id: string) => request.del(`/techniquecharts/${id}`),
  get: (id: string) => request.get(`/techniquecharts/${id}`),
  edit: (chart: ITechniqueChart) => request.put(`/techniquecharts/edit`, chart),
};

const BlogPosts = {
  listPostedBlogs: (): Promise<IBlog[]> =>
    request.get("/blogposts/list-posted-blogs"),
  listMyBlogs: (): Promise<IBlog[]> => request.get("/blogposts/list-my-blogs"),
  listSubmittedBlogs: (): Promise<IBlog[]> =>
    request.get("/blogposts/list-submitted-blogs"),
  createBlogPost: (): Promise<IBlog> =>
    request.post("/blogposts/create-blog", {}),
  listPostedPositioningGuides: (): Promise<IBlog[]> =>
    request.get("/blogposts/list-posted-positioning-guides"),
  listMyPositioningGuides: (): Promise<IBlog[]> =>
    request.get("/blogposts/list-my-positioning-guides"),
  listSubmittedPositioningGuides: (): Promise<IBlog[]> =>
    request.get("/blogposts/list-submitted-positioning-guides"),
  createPositioningGuide: (): Promise<IBlog> =>
    request.post("/blogposts/create-positioning-guide", {}),
  submit: (id: string) => request.post(`/blogposts/submit/${id}`, {}),
  approve: (id: string) => request.post(`/blogposts/approve-blog/${id}`, {}),
  reject: (id: string, feedback: string) =>
    request.post(`/blogposts/reject-blog`, { id, feedback }),
  delete: (id: string) => request.del(`/blogposts/${id}`),
  getPostedBlog: (id: string): Promise<IBlog> =>
    request.get(`/blogposts/${id}`),
  getMyBlog: (id: string): Promise<IBlog> =>
    request.get(`/blogposts/get-my-blog/${id}`),
  edit: (blogPost: IBlog) => request.put(`/blogposts/edit`, blogPost),
  listPaginatedBlogs: (page: number): Promise<IBlog[]> =>
    request.get(`/blogposts/list-paginated-blogs/${page}`),
};

const DummyValues = {
  getDummyValues: () => request.get("/dummyvalues"),
};

export default { User, TechniqueCharts, BlogPosts, DummyValues };
