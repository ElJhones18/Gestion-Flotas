import { useNavigate } from "react-router-dom";

export const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <h1>Desautorizado</h1>
            <br />
            <p>No tienes acceso a la esta pagina.</p>
            <button onClick={goBack}>Regresar</button>
        </div>
    )
}