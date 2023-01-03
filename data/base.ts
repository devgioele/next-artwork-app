const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
  const res = await fetch(input, init);

  // Throw an error if the status code of the response is not in the range 200-299
  if (!res.ok) {
    throw { info: await res.json(), status: res.status };
  }

  return res.json();
};

export default fetcher;
