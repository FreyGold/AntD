import LogoutButton from "./shared/LogoutButton";
import Profile from "./shared/Profile";

function LogoutCard() {
   return (
      <div className="flex flex-col gap-8 w-full h-full justify-center items-center">
         <Profile />
         <LogoutButton />
      </div>
   );
}

export default LogoutCard;
