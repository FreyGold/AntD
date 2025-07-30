import Input from "@/components/UI/Input";
import { BellOutlined, DownOutlined } from "@ant-design/icons";
import ThemeToggleButton from "./ToggleTheme";
import { useAuth0 } from "@auth0/auth0-react";

function SearchBar() {
   const { isAuthenticated, user } = useAuth0();
   const name = user?.sub?.startsWith("github") ? user?.nickname : user?.name;
   return (
      <div className="flex items-center justify-between px-6 py-3 mt-8 rounded-4xl h-15 bg-background">
         <Input />
         {/* // is this a correct approach? // moved to UI folder */}
         {/* { switch to ant component in the next iteration} */}
         <div className="flex items-center w-64 gap-2 justify-between">
            <ThemeToggleButton></ThemeToggleButton>
            <BellOutlined style={{ fontSize: "1.7rem" }} />
            <div className="flex items-center flex-1 gap-3 justify-between">
               {isAuthenticated ? (
                  <img
                     src={user?.picture}
                     alt={name}
                     className="w-8 h-8 rounded-full"
                  />
               ) : (
                  <svg
                     fill="none"
                     height="36"
                     viewBox="0 0 20 20"
                     width="36"
                     xmlns="http://www.w3.org/2000/svg">
                     <path
                        clipRule="evenodd"
                        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
                        fill="#4A5568"
                        fillRule="evenodd"
                     />
                  </svg>
               )}
               <div className="flex flex-col text-[8px] flex-1 justify-center">
                  <p className="text-[10px]">Workspace</p>
                  <div className="flex gap-1 items-center">
                     <p className="text-[12px]">
                        {isAuthenticated ? name : "User Profile"}
                     </p>
                     <DownOutlined />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SearchBar;
