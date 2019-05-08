import { Observable } from 'rxjs';

function checkStatusCode(response) {
  if (response.ok) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatusCode)
    .then(response => response.json())
}

export function observableRequest(url, options) {
  return new Observable(observer => {
    request(url, options)
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(err => observer.error(err));
  });
}
