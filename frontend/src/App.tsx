import { Routes, Route } from "react-router-dom";

import CheckInPage from "./pages/CheckInPage";
import TestQrPage from "./pages/TestQrPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<CheckInPage />}
      />

      <Route
        path="/qr-test"
        element={<TestQrPage />}
      />
    </Routes>
  );
}

export default App;