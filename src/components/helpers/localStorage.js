export const getData = (key) => {
  if (!window.localStorage) return;
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    console.error(`This ${err} happed for ${key} as key.`);
  }
};

export const storeData = (key, newData) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(newData));
  } catch (error) {
    console.error(`This ${error} happened for this ${key}`);
  }
};
