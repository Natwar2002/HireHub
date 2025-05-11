import { Avatar } from "@heroui/avatar"

export const UserButton = ({ link, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex items-center gap-4 focus:outline-none"
        >
            <Avatar 
                isBordered 
                color="secondary" 
                src={link} 
            />
        </button>
    )
}