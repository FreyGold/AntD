import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const LoginButton = ({ className }: { className: string }) => {
   const { loginWithRedirect } = useAuth0();

   return (
      <Button
         onClick={() => loginWithRedirect()}
         className={className}
         color="red"
         variant="solid">
         Log In
      </Button>
   );
};

export default LoginButton;
