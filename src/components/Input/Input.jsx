const Input = ({ name, placeholder, value, type, onChange, Icon, pattern }) => {
    return (
        <div className="input_component">
            <input
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
