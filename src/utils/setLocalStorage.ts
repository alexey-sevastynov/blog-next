export function setLocalStorage(key: string, value: unknown) {
  const data = JSON.stringify(value);

  return window.localStorage.setItem(key, data);
}
