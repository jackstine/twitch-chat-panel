class WebAPI {
  constructor({ endpoint }) {
    this.endpoint = endpoint;
    this.addedHeaders = []
  }

  addHeader (header) {
    this.addedHeaders.push(header)
  }

  async __post(url, data, options) {
    options = options ?? {};
    options.method = "POST";
    return this.__fetch(url, data, options);
  }

  async __delete(url, data, options) {
    options = options ?? {};
    options.method = "DELETE";
    return this.__fetch(url, data, options);
  }

  async __put(url, data, options) {
    options = options ?? {};
    options.method = "PUT";
    return this.__fetch(url, data, options);
  }

  async __get(url, data, options) {
    options = options ?? {};
    options.method = "GET";
    return await this.__fetch(url, data, options);
  }

  async __fetch(url, data, options) {
    options = options ?? {};
    url = url || "";
    let headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
    let calling = this.endpoint + url;
    for (let head of  this.addedHeaders) {
      headers[head.key] = head.value
    }
    let requestOptions = {
      method: options.method, // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers,
      credentials: "same-origin", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    if (options.method !== "GET") {
      requestOptions.body = JSON.stringify(data); // body data type must match "Content-Type" header
    } else {
      if (data) {
        calling = `${calling}?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`;
      }
    }
    const response = await fetch(calling, requestOptions);
    if (response.status === 200) {
      return response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw response;
    }
  }
}

export default WebAPI;
