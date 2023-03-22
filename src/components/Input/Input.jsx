const Input = ({ name, placeholder, value, type, onChange, Icon }) => {
    return (
        <div className="input_component">
            <input
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
            {Icon && <Icon />}
        </div>
    );
};

export default Input;
