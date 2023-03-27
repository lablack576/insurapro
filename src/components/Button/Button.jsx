const Button = ({ text, type = "button", onClick, background = "#42a867" }) => {
    return (
        <button
            style={{ backgroundColor: background }}
            type={type}
            onClick={onClick}
            className="button_component"
        >
            {text}
        </button>
    );
};

export default Button;
