import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
   const { user, isAuthenticated, isLoading } = useAuth0();
   const name = user?.sub?.startsWith("github") ? user?.nickname : user?.name;
   if (isLoading) {
      return <div>Loading ...</div>;
   }

   return (
      isAuthenticated && (
         <div className="flex flex-col justify-center items-center gap-4">
            <img
               src={user?.picture}
               alt={name}
               className="w-20 h-20 rounded-full"
            />
            <h2>{name}</h2>
            <p>{user?.email}</p>
         </div>
      )
   );
};

export default Profile;
