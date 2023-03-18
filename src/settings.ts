const localeString = localStorage.getItem("locale");
console.log(localeString);
export const settings = {
    language: localeString ? JSON.parse(localeString).locale as string : "ptBR"
}