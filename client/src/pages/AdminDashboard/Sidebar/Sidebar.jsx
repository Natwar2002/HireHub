import { useState, useEffect, useRef } from "react"
import {
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  User,
  LogOut,
  Edit,
} from "lucide-react"

// Import your @heroui/react components here
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  useDisclosure,
} from "@heroui/react"
import { Navigate, useNavigate } from "react-router-dom"
import store from '../../../redux/store'
import { logout } from "../../../redux/actions/authAction"


// Hook to detect dark mode properly
function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
    const htmlHasDark = document.documentElement.classList.contains('dark');
    const bodyHasDark = document.body.classList.contains('dark');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      setIsDark(htmlHasDark || bodyHasDark || prefersDark);
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => checkDarkMode();
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  return isDark;
}

function UserProfilePopup({ isOpen, onOpenChange, userDetails, onEditProfile }) {
  const isDark = useDarkMode();
  const navigate = useNavigate();
  
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      placement="top-center"
      classNames={{
        base: isDark ? "bg-slate-900" : "bg-white",
        header: isDark ? "text-white" : "text-gray-900",
        body: isDark ? "text-gray-300" : "text-gray-700",
        footer: isDark ? "bg-slate-800" : "bg-white",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">User Profile</h3>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-6 items-center py-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar
                  src={userDetails?.avatar}
                  alt={userDetails?.username}
                  className="w-20 h-20 text-large"
                  name={userDetails?.username?.charAt(0)?.toUpperCase()}
                />
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center gap-2 w-full">
                <h4 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userDetails?.username || "N/A"}
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {userDetails?.email || "No email provided"}
                </p>
              </div>

              {/* Additional Info */}
              <div className="w-full space-y-3">
                <div className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Account Status
                  </span>
                  <span className={`text-sm px-2 py-1 rounded-full ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    Active
                  </span>
                </div>
                
                <div className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Role
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Recruiter
                  </span>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex justify-between">
              <Button 
                variant="light" 
                color="danger" 
                startContent={<LogOut size={16} />}
                onPress={() => {
                  store.dispatch(logout());
                  navigate('/home');
                  onClose();
                }}
                className={isDark ? "text-red-400" : "text-red-600"}
              >
                Logout
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className={isDark ? "text-gray-300" : "text-gray-700"}
                >
                  Close
                </Button>
                <Button 
                  color="primary" 
                  startContent={<Edit size={16} />}
                  onPress={() => {
                    onEditProfile?.();
                    onClose();
                  }}
                >
                  Edit Profile
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

// Edit Profile Modal Component
function EditProfileModal({ isOpen, onOpenChange, userDetails, onSave }) {
  const [username, setUsername] = useState(userDetails?.username || "")
  const [email, setEmail] = useState(userDetails?.email || "")
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const isDark = useDarkMode()

  useEffect(() => {
    setUsername(userDetails?.username || "")
    setEmail(userDetails?.email || "")
    setSelectedImage(userDetails?.avatar)
  }, [userDetails])

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const resetForm = () => {
    setUsername(userDetails?.username || "")
    setEmail(userDetails?.email || "")
    setSelectedImage(userDetails?.avatar)
  }

  const handleSubmit = async () => {
    if (!username?.trim()) {
      alert("Username is required.")
      return
    }

    setIsPending(true)
    
    const payload = {
      username,
      email,
      avatar: selectedImage,
    }

    try {
      await onSave?.(payload)
      onOpenChange(false)
      resetForm()
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      placement="top-center"
      classNames={{
        base: isDark ? "bg-slate-800" : "bg-white",
        header: isDark ? "text-white" : "text-gray-900",
        body: isDark ? "text-gray-300" : "text-gray-700",
        footer: isDark ? "bg-slate-800" : "bg-white",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody className="flex flex-col gap-4 items-center">
              <Input
                label="Username"
                disabled={isPending}
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                classNames={{
                  input: isDark ? "text-white" : "text-gray-900",
                  label: isDark ? "text-gray-300" : "text-gray-700",
                }}
              />
              
              <Input
                label="Email"
                disabled={isPending}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={{
                  input: isDark ? "text-white" : "text-gray-900",
                  label: isDark ? "text-gray-300" : "text-gray-700",
                }}
              />
              
              <div
                className={`w-24 h-24 rounded-full border-2 border-dashed cursor-pointer hover:border-primary flex items-center justify-center overflow-hidden ${
                  isDark 
                    ? 'border-gray-600 bg-slate-700' 
                    : 'border-gray-400 bg-gray-50'
                }`}
                onClick={handleImageClick}
              >
                {selectedImage ? (
                  <img
                    src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className={`text-sm text-center px-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Click to upload
                  </span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                  className="hidden"
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button 
                variant="light" 
                color="danger" 
                onPress={() => {
                  onClose()
                  resetForm()
                }}
              >
                Cancel
              </Button>
              <Button 
                color="primary" 
                onClick={handleSubmit}
                isLoading={isPending}
                className="flex items-center"
              >
                {isPending ? "Saving..." : "Save"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

function SidebarItem({ icon, label, collapsed, onClickHandler }) {
  const isDark = useDarkMode()
  
  return (
    <div
      className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
        collapsed ? "justify-center" : "gap-3"
      } ${
        isDark 
          ? 'hover:bg-slate-800' 
          : 'hover:bg-gray-800'
      }`}
      onClick={onClickHandler}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </div>
  )
}

// Main Sidebar Component
export default function Sidebar({ children, userDetails, onUpdateProfile }) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onOpenChange: onProfileOpenChange } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure()
  const isDark = useDarkMode()

  const handleEditProfile = () => {
    onEditOpen()
  }

  const handleSaveProfile = async (profileData) => {
    try {
      await onUpdateProfile?.(profileData)
      // You can add success notification here
    } catch (error) {
      // Handle error
      console.error("Failed to update profile:", error)
    }
  }

  return (
    <>
      <div className="flex h-screen">
        <div
          className={`text-white transition-all duration-300 ease-in-out ${
            collapsed ? "w-16" : "w-64"
          } ${
            isDark 
              ? 'bg-slate-900' 
              : 'bg-slate-600'
          }`}
        >
          <div className="flex items-center justify-between p-4">
            {!collapsed && <span className="text-lg font-bold">HireHub</span>}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="hover:bg-slate-800 p-1 rounded transition-colors"
            >
              {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex flex-col p-2 space-y-2">
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              collapsed={collapsed}
              onClickHandler={() => navigate("/recruiter/dashboard")}
            />
            <SidebarItem
              icon={<Users size={20} />}
              label="Jobs"
              collapsed={collapsed}
              onClickHandler={() => navigate("/recruiter/postedJobs")}
            />
            <SidebarItem
              icon={<Settings size={20} />}
              label="Settings"
              collapsed={collapsed}
              onClickHandler={() => {}}
            />
          </nav>

          {/* User Profile Section */}
          <div className="absolute bottom-0 w-fit p-2">
            <div
              className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                collapsed ? "justify-center" : "gap-3"
              } ${
                isDark 
                  ? 'hover:bg-slate-800' 
                  : 'hover:bg-gray-800'
              }`}
              onClick={onProfileOpen}
            >
              <Avatar
                src={userDetails?.avatar}
                alt={userDetails?.username}
                className="w-8 h-8"
                name={userDetails?.username?.charAt(0)?.toUpperCase()}
              />
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[150px]">
                    {userDetails?.username || "User"}
                  </span>
                  <span className="text-xs text-gray-400 truncate max-w-[150px]">
                    {userDetails?.email || "No email"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`w-full m-4 rounded-xl transition-colors p-4 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
          {children}
        </div>
      </div>

      {/* Modals */}
      <UserProfilePopup
        isOpen={isProfileOpen}
        onOpenChange={onProfileOpenChange}
        userDetails={userDetails}
        onEditProfile={handleEditProfile}
      />

      <EditProfileModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        userDetails={userDetails}
        onSave={handleSaveProfile}
      />
    </>
  )
}