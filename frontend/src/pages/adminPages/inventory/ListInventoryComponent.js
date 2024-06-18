import { PATHS } from "../../../utils/config";
import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import './ListInventoryComponent.css';
import { 
    CheckCircleOutlined,
    ToolOutlined,
    LoadingOutlined,
    LineOutlined,
    CheckOutlined,
    DashboardOutlined,
    SaveOutlined,
    TruckOutlined,
    UserOutlined,
    ShopOutlined,
    FireOutlined
} from "@ant-design/icons";

export const ListInventoryComponent = () => {
  const baseApi = PATHS.BASE_PATH;
  const listTasksPath = PATHS.API_ROUTES.LIST_TASKS;
  const ListTirePath = PATHS.API_ROUTES.LIST_TIRES;
  const ListTruckPath = PATHS.API_ROUTES.LIST_TRUCKS;
  const ListDriverPath = PATHS.API_ROUTES.LIST_USERS;
  const ListTravelPath = PATHS.API_ROUTES.LIST_TRAVELS;
  const ListFuelPath = PATHS.API_ROUTES.LIST_FUELS;
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    enProgreso: 0,
    porHacer: 0,
    realizada: 0,
  });
  const [tireCounts, setTireCounts] = useState({
    total: 0,
    enUso: 0,
    enAlmacen: 0,
  });
  const [truckCounts, setTruckCounts] = useState({});
  const [driverCounts, setDriverCounts] = useState({
    total: 0,
    Conductor: 0,
  });
  const [travelCounts, setTravelCounts] = useState({});
  const [fuelCounts, setFuelCounts] = useState({});

  const getTasks = useCallback(async () => {
    try {
      const URL = `${baseApi}${listTasksPath}`;
      const response = await fetch(URL);
      const tasks = await response.json();
      let enProgreso = 0;
      let porHacer = 0;
      let realizada = 0;
      tasks.forEach((task) => {
        if (task.state === "En progreso") {
          enProgreso++;
        } else if (task.state === "Por hacer") {
          porHacer++;
        } else if (task.state === "Realizada") {
          realizada++;
        }
      });
      setTaskCounts({
        total: tasks.length,
        enProgreso,
        porHacer,
        realizada,
      });
    } catch (error) {
      console.log(error);
    }
  }, [baseApi, listTasksPath]);

  const getTires = useCallback(async () => {
    try {
      const URL = `${baseApi}${ListTirePath}`;
      console.log(URL);
      const response = await fetch(URL);
      const tires = await response.json();
      let enUso = 0;
      let enAlmacen = 0;
      tires.forEach((tire) => {
        if (!tire.truckId) {
          enAlmacen++;
        } else if (tire.truckId) {
          enUso++;
        }
      });
      setTireCounts({ 
        total: tires.length, 
        enUso, 
        enAlmacen });
    } catch (error) {
      console.log(error);
    }
  }, [baseApi, ListTirePath]);

  const getTrucks = useCallback(async () => {
    try {
      const URL = `${baseApi}${ListTruckPath}`;
      console.log(URL);
      const response = await fetch(URL);
      const trucks = await response.json();
      const result = trucks.length;
      setTruckCounts(result);
    } catch (error) {
      console.log(error);
    }
  }, [ListTruckPath, baseApi]);

  const getUsers = useCallback(async () => {
    try {
      const URL = `${baseApi}${ListDriverPath}`;
      console.log(URL);
      const response = await fetch(URL);
      const result = await response.json();
      let Conductor = 0;
      result.forEach((driver) => {
        if (driver.rol === "Conductor") {
          Conductor++;
        }
      });
      setDriverCounts({
        total: result.length,
        Conductor,
      });
    } catch (error) {
      console.error(error);
    }
  }, [baseApi, ListDriverPath]);

  const getTravels = useCallback(async () => {
    try {
      const URL = `${baseApi}${ListTravelPath}`;
      console.log(URL);
      const response = await fetch(URL);
      const result = await response.json();
      const travels = result.length;
      setTravelCounts(travels);
    } catch (error) {
      console.error(error);
    }
  }, [baseApi, ListTravelPath]);

  const getFuels = useCallback(async () => {
    try {
      const URL = `${baseApi}${ListFuelPath}`;
      console.log(URL);
      const response = await fetch(URL);
      const result = await response.json();
      const fuels = result.length;
      setFuelCounts(fuels);
    } catch (error) {
      console.log(error);
    }
  }, [baseApi, ListFuelPath]);

  useEffect(() => {
    getTasks();
    getTires();
    getTrucks();
    getUsers();
    getTravels();
    getFuels();
  }, [getTasks, getTires, getTrucks, getUsers, getTravels, getFuels]);

  const columns = [
    {
      title: (
        <h2 className="bold" style={{ textAlign: "center" }}>
          <CheckCircleOutlined /> Tareas
        </h2>
      ),
      children: [
        {
          title: (
            <h4 className="bold" style={{ textAlign: "center" }}>
              <LoadingOutlined/> En progreso
            </h4>
          ),
          dataIndex: "enProgreso",
          key: "enProgreso",
          align: "center",
        },
        {
          title: (
            <h4 className="bold" style={{ textAlign: "center" }}>
             <LineOutlined/> Por hacer
            </h4>
          ),
          dataIndex: "porHacer",
          key: "porHacer",
          align: "center",
        },
        {
          title: (
            <h4 className="bold" style={{ textAlign: "center" }}>
             <CheckOutlined/> Realizadas
            </h4>
          ),
          dataIndex: "realizada",
          key: "realizada",
          align: "center",
        },
      ],
    },
    {
      title: (
        <h2 className="bold" style={{ textAlign: "center" }}>
          <ToolOutlined /> Neumáticos
        </h2>
      ),
      children: [
        {
          title: (
            <h4 className="bold" style={{ textAlign: "center" }}>
             <DashboardOutlined/> En uso
            </h4>
          ),
          dataIndex: "enUso",
          key: "enUso",
          align: "center",
        },
        {
          title: (
            <h4 className="bold" style={{ textAlign: "center" }}>
             <SaveOutlined/> En almacén
            </h4>
          ),
          dataIndex: "enAlmacen",
          key: "enAlmacen",
          align: "center",
        },
      ],
    },
    {
      title: (
        <h4 className="bold" style={{ textAlign: "center" }}>
         <TruckOutlined/> Camiones
        </h4>
      ),
      dataIndex: "trucks",
      key: "trucks",
      align: "center",
      className: "bold",
    },
    {
      title: (
        <h4 className="bold" style={{ textAlign: "center" }}>
         <UserOutlined/> Conductores
        </h4>
      ),
      dataIndex: "driver",
      key: "driver",
      align: "center",
      className: "bold",
    },
    {
      title: (
        <h4 className="bold" style={{ textAlign: "center" }}>
         <ShopOutlined /> Viajes
        </h4>
      ),
      dataIndex: "travels",
      key: "travels",
      align: "center",
      className: "bold",
    },
    {
      title: (
        <h4 className="bold" style={{ textAlign: "center" }}>
         <FireOutlined/> Combustibles
        </h4>
      ),
      dataIndex: "fuels",
      key: "fuels",
      align: "center",
      className: "bold",
    },
  ];

return (
    <div>
        <h1 className="bold" style={{ textAlign: "center", marginBottom: '10px' }}>
            INVENTARIO
        </h1>
        <h3 style={{ textAlign: "center", marginBottom: '30px' }}>
            Aqui podra ver el inventario con el que cuenta la compañía. <br/>
            Se incluye información sobre tareas, neumáticos, camiones, conductores, viajes y combustibles.
        </h3>
        <Table
            className="custom-table"
            columns={columns}
            dataSource={[
                {
                    key: "1",
                    ...taskCounts,
                    key1: "2",
                    ...tireCounts,
                    trucks: truckCounts,
                    driver: driverCounts.Conductor,
                    travels: travelCounts,
                    fuels: fuelCounts,
                },
            ]}
        />
    </div>
);
};
