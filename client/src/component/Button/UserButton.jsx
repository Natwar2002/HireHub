import { Avatar } from "@heroui/avatar"

export const UserButton = ({ onUserClick, link }) => {
    return (
        <div 
            className="flex gap-4 items-center"
            onClick={onUserClick}
        >
            <Avatar 
                isBordered 
                color="secondary" 
                src={link} 
            />
        </div>
    )
}