import { useParams } from "react-router-dom";
import Tab from "../../../components/Tab/Tab";
import ViewContent from "./ViewContent";

const View = ({}) => {
    const { clientUID } = useParams();

    return (
        <Tab name="Clients Info" content={<ViewContent cid={clientUID} />} />
    );
};

export default View;
