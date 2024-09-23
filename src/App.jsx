import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "Context/Auth";
import { GlobalProvider } from "Context/Global";
import Main from "./main";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
      <DndProvider backend={HTML5Backend}>

        <Router>
          <Main />
        </Router>
      </DndProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
