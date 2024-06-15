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

/* NEUMATICOS */
import { ListTireComponent } from "../pages/adminPages/tire/ListTireComponent";

import { DragAndDrop } from "../pages/adminPages/tasks/ListTaskComponent";
import { Logout } from "../pages/authPages/Logout.js";
import CreateTruckComponent from "../pages/adminPages/trucks/CreateTruckComponent.js";
import CreateTireComponent from "../pages/adminPages/tire/CreateTireComponent.js";
import ChecklistComponent from "../pages/adminPages/trucks/ChecklistComponent.js";

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
                </Route>

                <Route element={<RequireAuth allowedRoles={["Conductor", "Admin"]} />}>
                    <Route path={ROUTES.HOME} element={loadLayout(AdminLayout, Home)} />
                    <Route path={ROUTES.LOGOUT} element={loadLayout(AdminLayout, Logout)} />
                    <Route path={ROUTES.ADMIN_LIST_TRUCKS} element={loadLayout(AdminLayout, ListTruckComponent)} />
                    <Route path={ROUTES.CHECKLIST} element={loadLayout(AdminLayout, ChecklistComponent)} />
                </Route>

                <Route element={<RequireAuth allowedRoles={["Conductor", "Admin"]} />}>
                    <Route path={ROUTES.ADMIN_LIST_TIRES} element={loadLayout(AdminLayout, ListTireComponent)} />
                    <Route path={ROUTES.ADMIN_CREATE_TIRE} element={loadLayout(AdminLayout, CreateTireComponent)} />
                </Route>


            </Route>

        </Routes >
    )
}