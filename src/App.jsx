import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Home from "./admin/pages/home/Home";
import "./App.css";
import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardMain from "./admin/pages/DashboardMain";
import AddItem from "./admin/pages/addItem/AddItem";
import Items from "./admin/pages/items/Items";
import MainCategory from "./admin/pages/mainCategory/MainCategory";
import SubCategory from "./admin/pages/subCategory/SubCategory";
import OrderDashboardMain from "./orderDashboard/Pages/OrderDashboardMain";
import Order from "./orderDashboard/Pages/order/Order";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Table from "./admin/pages/table/TablePage";
import { ToastContainer } from "react-toastify";
import OrderHome from "./orderDashboard/Pages/home/OrderHome";
import JeevanRegister from "./Pages/JeevanRegister";
import JeevanLogin from "./Pages/JeevanLogin";
import JeevanDashboard from "./Pages/JeevanDashboard";
function App() {
  return (
    <div className="App relative">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<DashboardMain />}>
            <Route path="/admin/" element={<Home />} />
            <Route path="/admin/table" element={<Table />} />
            <Route path="/admin/table/:id" element={<Table />} />
            <Route path="/admin/:id" element={<AddItem />} />
            <Route path="/admin/items" element={<Items />} />
            <Route path="/admin/items/:id" element={<Items />} />
            <Route path="/admin/mainCategory" element={<MainCategory />} />
            <Route path="/admin/mainCategory/:id" element={<MainCategory />} />
            <Route
              path="/admin/mainCategory/:id/:editId"
              element={<MainCategory />}
            />
            <Route path="/admin/subCategory" element={<SubCategory />} />
            <Route path="/admin/subCategory/:id" element={<SubCategory />} />
          </Route>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<JeevanLogin />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/registerjeevan" element={<JeevanRegister />} />
          <Route path="/jeevandashboard" element={<JeevanDashboard />} />

          <Route path="/orderDashboard" element={<OrderDashboardMain />}>
            <Route path="/orderDashboard/" element={<OrderHome />} />
            <Route path="/orderDashboard/order" element={<Order />} />
            <Route path="/orderDashboard/order/:tableId" element={<Order />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
