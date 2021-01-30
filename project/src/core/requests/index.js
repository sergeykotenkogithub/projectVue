export function get(url) {
  return fetch(url).then((data) => data.json());
}

export function post(url) {
  return fetch(url).then((d) => d.json());
}

export function put(url) {
  return fetch(url).then((d) => d.json());
}

export function deleteReq(url) {
  return fetch(url).then((d) => d.json());
}
