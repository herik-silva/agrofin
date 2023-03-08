const localeString = localStorage.getItem("locale");

export const settings = {
    language: localeString ? JSON.parse(localeString).locale as string : "ptBR"
}