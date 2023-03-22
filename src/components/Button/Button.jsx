const Button = ({ text, type = "button", onClick }) => {
    return (
        <button type={type} onClick={onClick} className="button_component">
            {text}
        </button>
    );
};

export default Button;
