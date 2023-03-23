import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./Clients.css";

const ClientsContent = () => {
    const [search, setSearch] = useState();

    return (
        <div className="ClientsContent">
            <div className="header">
                <Input
                    name="search"
                    placeholder="Search for clients by name"
                    Icon={FiSearch}
                    value={search}
                    type="text"
                    onChange={setSearch}
                />
                <Button text="Add" type="button" />
            </div>
        </div>
    );
};

export default ClientsContent;
