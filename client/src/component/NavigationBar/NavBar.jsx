import SwitchButton from "../Switch/SwitchButton";
import Logo from "../../assets/job-search.png";
import { useNavigate } from "react-router-dom";
import { UserButton } from '../Button/UserButton'
import store from "../../redux/store";
import { NavItem } from './NavItem'
import { useDisclosure } from "@heroui/modal";
import { UserDetails } from "../UserDetails/UserDetails";
import { useGetUserDetails } from "../../hooks/user/useGetUserDetails"
import { setUserDetails } from "../../redux/actions/authAction";

export default function NavBar() {

  const navigate = useNavigate();
  const { user, token } = store.getState().auth;
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { userDetails } = useGetUserDetails({ enabled: !!token });
  store.dispatch(setUserDetails(userDetails));

  function handleAppliedJobsClick() {
    if(!user && !token) {
      navigate('/auth/signin');
      return;
    } else {
      navigate('/applied-jobs');
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
      <UserDetails
        onClose={onClose}
        isOpen={isOpen}
        userDetails={userDetails}
      />
      <div className="w-[80vw] h-10 flex items-center justify-between mx-auto mt-10">
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
              label='Applied Jobs'
              onClickHandler={handleAppliedJobsClick}
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
              link={userDetails?.avatar}
              onClick={handleUserButtonClick}
            />
          ) : (
            <div className="flex items-center gap-6 max-lg:flex-col max-md:flex-row">
              <button 
                className="py-4 rounded-xl"
                onClick={() => navigate('/auth/signin')}
              >
                Sign In
              </button>
              <button 
                className="px-4 py-1 rounded-lg mr-6 border-[2px] border-white"
                onClick={() => navigate('/auth/signup')}
              >
                Sign Up
              </button>
            </div>
          )}
          <SwitchButton />
        </div>
      </div>
    </>
  );
}
