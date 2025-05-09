export const NavItem = ({ onClickHandler, label}) => {
    return (
        <span 
            className="cursor-pointer hover:text-purple-400"
            onClick={onClickHandler}
        >
            {label}
        </span>
    )
}