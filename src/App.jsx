import "../node_modules/react-vis/dist/style.css";
import {Menu} from "./components/Menu";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {Lab1} from "./pages/lab1/Lab1";
import {Lab2} from "./pages/lab2/Lab2";
import {Linear} from "./pages/lab1/Linear";
import {Branched} from "./pages/lab1/Branched";
import {Circular} from "./pages/lab1/Circular";
import {Lab3} from "./pages/lab3/Lab3";
import {Lab4} from "./pages/lab4/Lab4";

function App() {
  return (
  <BrowserRouter basename={`/${import.meta.env.VITE_BASE_ROUTE}`}>
    <div className="flex">
      <Menu />
      <div className="p-12 w-full">
        <Routes>
          <Route path="/lab-1" element={<Lab1 />}>
            <Route path="linear" element={<Linear />} />
            <Route path="branched" element={<Branched />} />
            <Route path="circular" element={<Circular />} />
          </Route>
          <Route path="/lab-2" element={<Lab2 />} />
          <Route path="/lab-3" element={<Lab3 />} />
          <Route path="/lab-4" element={<Lab4 />} />
          <Route path="/lab-5" element={null} />
          <Route path="*" element={<Navigate to="/lab-1" replace />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App
