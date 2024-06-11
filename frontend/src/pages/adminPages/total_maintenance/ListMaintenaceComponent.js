import { useDispatch } from "react-redux";


const { confirm } = Modal;

export const ListMaintenanceComponent = () => {
    const dispatch = useDispatch();
    const maintenance = useSelector((state) => state.maintenance);
    const maintenanceApi = new Maintenance();
}