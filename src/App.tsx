import AppViewer from "./components/AppViewer/AppViewer";
import { GlobalStyle } from "./styles";

var loadedLanguage = false;

export function getLanguageText() {
  fetch("./language-list.json", {
    headers: {
      Accept: "application/json"
    }
  }).then(res => res.json()).then((res) => {
    localStorage.setItem("language", JSON.stringify(res));
    loadedLanguage = true;

  });
}

function App() {
  if(!localStorage.getItem("language")){
    localStorage.setItem("locale", JSON.stringify({locale: "ptBR"}));
    getLanguageText();
    var interval = setInterval(()=>{
      if(loadedLanguage){
        clearInterval(interval);
        window.open("/", "_self");
      }
    },500)
  }

  
  return (
    <div>
      <GlobalStyle />
      {loadedLanguage ? <h1>Agrofin</h1> : <AppViewer />}
    </div>
  );
}

export default App;
