import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./Accidents.css";

const AccidentsContent = () => {
    const [search, setSearch] = useState();

    return (
        <div className="AccidentsContent">
            <div className="header">
                <Input
                    name="search"
                    placeholder="Search for accidents by client name"
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

export default AccidentsContent;
