import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Link, Route, Routes } from "react-router-native";
import AboutUs from './Components/AboutUs/AboutUs';
import AdminRoute from './Components/Authentication/AdminRoute/AdminRoute';
import Login from './Components/Authentication/Login';
import PrivateRoute from './Components/Authentication/PrivateRoute/PrivateRoute';
import Registration from './Components/Authentication/Registration';
import AddProduct from './Components/Dashboard/Admin/AddProduct';
import MakeAdmin from './Components/Dashboard/Admin/MakeAdmin';
import ManageAllOrder from './Components/Dashboard/Admin/ManageAllOrder';
import ManageProduct from './Components/Dashboard/Admin/ManageProduct';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import AddReview from './Components/Dashboard/User/AddReview';
import MyOrder from './Components/Dashboard/User/MyOrder';
import Home from './Components/Home/Home';
import PlaceOrder from './Components/Order/PlaceOrder/PlaceOrder';
import ProductDetails from './Components/Products/ProductDetails';
import Products from './Components/Products/Products';
import Header from './Components/Shared/Header';
import Authprovider from './Context/AuthProvider/Authprovider';

export default function App() {
  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <Authprovider>
        <NativeRouter>

          <Routes>
            <Route path="/" element={<Home></Home>}> </Route>
            <Route path="/home" element={<Home></Home>}> </Route>

            <Route path="/products" element={<Products></Products>}> </Route>
            <Route path="/aboutUs" element={<AboutUs></AboutUs>}> </Route>

            <Route path="/productDetails/:id" element={<PrivateRoute>
              <ProductDetails></ProductDetails>
            </PrivateRoute>}>
            </Route>

            <Route path="/placeOrder" element={<PrivateRoute>
              <PlaceOrder></PlaceOrder>
            </PrivateRoute>}>
            </Route>
            <Route path="/dashboard" element={<PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>}>

              <Route path="/dashboard/myOrder" element={<MyOrder></MyOrder>}> </Route>
              <Route path="/dashboard/addReview" element={<AddReview></AddReview>}> </Route>

              <Route path={`/dashboard/allOrder`} element={<AdminRoute>
                <ManageAllOrder></ManageAllOrder>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/addProduct`} element={<AdminRoute>
                <AddProduct></AddProduct>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute>
                <MakeAdmin></MakeAdmin>
              </AdminRoute>}>
              </Route>
              <Route path={`/dashboard/manageProduct`} element={<AdminRoute>
                <ManageProduct></ManageProduct>
              </AdminRoute>}>
              </Route>


            </Route>

            <Route path="/login" element={<Login></Login>}> </Route>
            <Route path="/register" element={<Registration></Registration>}> </Route>


          </Routes>

        </NativeRouter>
      </Authprovider>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
