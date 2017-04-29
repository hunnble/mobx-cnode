export const toPostData = args => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: Object.entries(args).map(item => `${item[0]}=${item[1]}`).join('&')
  };
};

export const setLocal = (key, data) => {
  localStorage[key] = JSON.stringify(data);
};

export const getLocal = key => {
  const value = localStorage[key];
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
