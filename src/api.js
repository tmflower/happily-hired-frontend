import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";


class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;
  

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // provides a template for api calls and passes token via the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Get details on a company by handle.
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // get details on all companies, or list of companies filtered by names matching user search terms
  static async getCompanies(name) {
    let res = await this.request(`companies/`, {name});
    return res.companies;
  }

  // get details on all jobs
  static async getJobs(title) {
    let res = await this.request(`jobs/`, {title});
    return res.jobs;
  }

  // register a new user and provide token  
  static async registerUser(newUser) {
    const data = await this.request(`auth/register/`, newUser, "post");
    JoblyApi.token = data.token;
  }

  // provide token for logged in user
  static async authenticateUser(user) {
    const data = await this.request(`auth/token`, user, "post");
    JoblyApi.token = data.token;
  }

  // get details on an individual user
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // update details on an individual user
  static async updateUser(username, updatedUserData) {
    let res = await this.request(`users/${username}`, updatedUserData, "patch");
    console.log(res.user);
    return res.user;
  }

  // Get details on a job by id.
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  // Add job to user's list of applied jobs
  static async addToAppliedJobs(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, jobId, "post");
    return res.jobId;
  }
}   

export default JoblyApi;