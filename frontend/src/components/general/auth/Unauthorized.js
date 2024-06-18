import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import image from "../../../uploads/images/desautorizado.webp"
export const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70%',width:"80%", textAlign: 'center' }}>
            <img src={image} alt="Unauthorized" style={{ width: '50%', height: '50%' }} />
            <Button onClick={goBack} type="primary">Regresar</Button>
        </div>
    )
}