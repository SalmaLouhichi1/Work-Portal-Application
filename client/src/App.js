import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Login from "scenes/login/Login.js";
import AddUser from "scenes/addUser/AddUser.js";
import Profile from "scenes/profile/profile";
import Receptions from "scenes/receptions";
import Manufacture from "scenes/manufacture";
import Expedition from "scenes/expedition";
import CreateExpedition from "scenes/CreateExpedition";
import CreateManufacture from "scenes/CreateManufacture";
import CreateReception from "scenes/CreateReception";
import UpdateExpedition from "scenes/updateExpedition";
import UpdateManufacture from "scenes/updateManufacture";
import UpdateReceptions from "scenes/updateReceptions";
import Performance from "scenes/performance";
import Landering from "scenes/landering";
import CreateLandering from "scenes/CreateLandering";
import UpdateLandering from "scenes/updateLandering";
import CreateProducts from "scenes/CreateProduct";
import UpdateProduct from "scenes/updateProduct";
import TLSAdmin from "scenes/tlsadmin";
import SewingContractor from "scenes/sewingcontractor";
import WashingContractor from "scenes/washingcontractor";
import UpdateUser from "scenes/updateUser";



function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              {/* Place the routes that require the layout here */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/createProduct" element={<CreateProducts />} />
              <Route path="/updateProduct/:id" element={<UpdateProduct />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/performance" element={<Performance />} /> 
              <Route path="/tlsadmin" element={<TLSAdmin />} />
              <Route path="/sewingcontractor" element={<SewingContractor />} />
              <Route path="/washingcontractor" element={<WashingContractor />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/receptions" element={<Receptions />} />
              <Route path="/manufacture" element={<Manufacture />} />
              <Route path="/expedition" element={<Expedition />} />
              <Route path="/createExpedition" element={<CreateExpedition />} />
              <Route path="/createManufacture" element={<CreateManufacture />} />
              <Route path="/createReception" element={<CreateReception />} />
              <Route path="/updateExpedition/:id" element={<UpdateExpedition />} />
              <Route path="/updateManufacture/:id" element={<UpdateManufacture />} />
              <Route path="/updateReceptions/:id" element={<UpdateReceptions />} />
              <Route path="/landering" element={<Landering />} />
              <Route path="/createLandering" element={<CreateLandering />} />
              <Route path="/updateLandering/:id" element={<UpdateLandering />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/updateUser/:id" element={<UpdateUser />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
