const Input = ({
    namelist,
    list,
    placeholder,
    value,
    type,
    onChange,
    Icon,
    pattern,
}) => {
    return (
        <div className="input_component">
            <input
                list={list}
                name={name}
                placeholder={placeholder}
                type={type}
                pattern={pattern}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
            {Icon && <Icon />}
        </div>
    );
};

export default Input;
