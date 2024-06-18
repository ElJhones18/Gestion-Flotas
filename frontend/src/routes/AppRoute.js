import React from "react";
import { Routes, Route } from 'react-router-dom';
import RequireAuth from '../components/general/auth/RequireAuth.js';
import PersistLogin from "../components/general/auth/PersistLogin.js";

import { Home } from "../pages/Home";
// import { Home } from "../pages/Home";
import { AdminLayout } from "../layouts/adminLayouts/AdminLayout";
import { ROUTES } from "./index"

/* USUARIOS */
import { ListComponent } from "../pages/adminPages/users/ListComponent";

/* CAMIONES */
import { ListTruckComponent } from "../pages/adminPages/trucks/ListTruckComponent";

/* COMBUSTIBLE */
import { ListFuelComponent } from "../pages/adminPages/fuels/ListFuelComponent";
import CreateFuelComponent from "../pages/adminPages/fuels/CreateFuelComponent";

/* NEUMATICO */
import { ListTireComponent } from "../pages/adminPages/tires/ListTireComponent";
import CreateTireComponent from "../pages/adminPages/tires/CreateTireComponent";

/* VIAJES */
import { ListTravelComponent } from "../pages/adminPages/travels/ListTravelComponent";
import { CreateTravelComponent } from "../pages/adminPages/travels/CreateTravelComponent.js";

/* INVENTORY */
import { ListInventoryComponent } from "../pages/adminPages/inventory/ListInventoryComponent";

import { DragAndDrop } from "../pages/adminPages/tasks/ListTaskComponent";
import { Logout } from "../pages/authPages/Logout.js";
import CreateTruckComponent from "../pages/adminPages/trucks/CreateTruckComponent.js";
import ChecklistComponent from "../pages/adminPages/trucks/ChecklistComponent.js";
import DriverPortal from "../pages/driverPages/DriverPortal.js";

import CreateMaintenanceComponent from "../pages/adminPages/total_maintenance/CreateMaintenaceComponent.js";
import ListMaintenanceComponent from "../pages/adminPages/total_maintenance/ListMaintenaceComponent.js";
import MyTasks from "../pages/driverPages/MyTasks.js";

export const AdminRoutes = () => {
    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page />
            </Layout>
        )
    }
    return (
        <Routes>

            <Route element={<PersistLogin />}>

                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    <Route path={ROUTES.ADMIN_LIST_USERS} element={loadLayout(AdminLayout, ListComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_TRUCK} element={loadLayout(AdminLayout, CreateTruckComponent)} />
                    <Route path={ROUTES.ADMIN_EDIT_TASK} element={loadLayout(AdminLayout, DragAndDrop)} />
                    <Route path={ROUTES.ADMIN_CREATE_TRAVEL} element={loadLayout(AdminLayout, CreateTravelComponent)} />
                    <Route path={ROUTES.ADMIN_LIST_TRAVELS} element={loadLayout(AdminLayout, ListTravelComponent)} />
                    <Route path={ROUTES.ADMIN_LIST_FUELS} element={loadLayout(AdminLayout, ListFuelComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_FUEL} element={loadLayout(AdminLayout, CreateFuelComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_TIRE} element={loadLayout(AdminLayout, CreateTireComponent)} />
                    <Route path={ROUTES.ADMIN_LIST_TIRES} element={loadLayout(AdminLayout, ListTireComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_MAINTENANCE} element={loadLayout(AdminLayout, CreateMaintenanceComponent)} />
                    <Route path={ROUTES.ADMIN_LIST_INVENTORY} element={loadLayout(AdminLayout, ListInventoryComponent)} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["Conductor"]} />}>
                    <Route path={ROUTES.DRIVER_PORTAL} element={loadLayout(AdminLayout, DriverPortal)} />
                    <Route path={ROUTES.MY_TASKS} element={loadLayout(AdminLayout, MyTasks)} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["Conductor", "Admin"]} />}>
                    <Route path={ROUTES.HOME} element={loadLayout(AdminLayout, Home)} />
                    <Route path={ROUTES.LOGOUT} element={loadLayout(AdminLayout, Logout)} />
                    <Route path={ROUTES.ADMIN_LIST_TRUCKS} element={loadLayout(AdminLayout, ListTruckComponent)} />
                    <Route path={ROUTES.CHECKLIST} element={loadLayout(AdminLayout, ChecklistComponent)} />
                    <Route path={ROUTES.ADMIN_LIST_MAINTENANCES} element={loadLayout(AdminLayout, ListMaintenanceComponent)} />
                </Route>


            </Route>

        </Routes >
    )
}