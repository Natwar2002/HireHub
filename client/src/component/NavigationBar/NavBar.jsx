import SwitchButton from "../Switch/SwitchButton";
import Logo from "../../assets/job-search.png";
import { useNavigate } from "react-router-dom";
import { UserButton } from '../Button/UserButton'
import store from "../../redux/store";
import { NavItem } from './NavItem'
import { useDisclosure } from "@heroui/modal";
import { UserModal } from "../Modal/UserModal";
export default function NavBar() {

  const navigate = useNavigate();
  const { user, token } = store.getState().auth;
  const {isOpen, onOpen, onClose} = useDisclosure();

  function handleInternClick() {
    if(!user && !token) {
      navigate('/auth/signin');
      return;
    } else {
      navigate('/internships');
    }
  }

  function handleContestClick() {
    if(!user && !token) {
      navigate('/auth/signin');
      return;
    } else {
      navigate('/contests');
    }
  }

  function handlePremiumClick() {
    if(!user && !token) {
      navigate('/auth/signin');
      return;
    } else {
      navigate('/premium');
    }
  }

  function handleUserButtonClick() {
    onOpen();
  }

  return (
    <>
      <UserModal 
        onClose={onClose}
        isOpen={isOpen}
        link={'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
      />
      <div className="w-[80vw] h-10 flex items-center justify-between mx-auto mt-10 ">
        <div className="flex items-center max-xl:flex-col max-xl:items-start ">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="logo" className="w-10" />
            <p className="text-2xl font-bold">HireHub</p>
          </div>
          <div className="relative left-12 flex gap-6">
            <NavItem 
              label='Home'
              onClickHandler={() => navigate('/home')}
            />
            <NavItem 
              label='Internships'
              onClickHandler={handleInternClick}
            />
            <NavItem 
              label='Contests'
              onClickHandler={handleContestClick}
            />
            <NavItem 
              label='Premium'
              onClickHandler={handlePremiumClick}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          { user && token? (
            <UserButton
              link={'https://i.pravatar.cc/150?u=a042581f4e29026704d'}
              onClick={handleUserButtonClick}
            />
          ) : (
            <div className="flex items-center gap-4 max-lg:flex-col max-md:flex-row">
              <button 
                className="px-14 py-4 bg-gradient-to-b from-[#CE9FFC] via-[#A582F7] to-[#7367F0] rounded-xl max-xl:py-1"
                onClick={() => navigate('/auth/signup')}
              >
                Sign Up
              </button>
              <button 
                className="px-14 py-4 border-[2px] border-[#A582F7] rounded-xl max-xl:py-1"
                onClick={() => navigate('/auth/signin')}
              >
                Sign In
              </button>
            </div>
          )}
          <SwitchButton />
        </div>
      </div>
    </>
  );
}
