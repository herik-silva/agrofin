import AppViewer from "./components/AppViewer";
import { GlobalStyle } from "./styles";

export function getLanguageText() {
  fetch("./language-list.json", {
    headers: {
      Accept: "application/json"
    }
  }).then(res => res.json()).then(res => localStorage.setItem("language", JSON.stringify(res)));
}

function changeLocale(text: string) {
  localStorage.setItem("locale", JSON.stringify({locale: text}));
  window.open("/", "_self");
}

function App() {
  getLanguageText();
  
  return (
    <div>
      <GlobalStyle />
      <AppViewer></AppViewer>
    </div>
  );
}

export default App;
