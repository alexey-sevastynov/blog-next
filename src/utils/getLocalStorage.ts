export function getLocalStorage(key: string) {
  const data = window.localStorage.getItem(key);

  return JSON.parse(data!);
}
