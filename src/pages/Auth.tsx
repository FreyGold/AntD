import LoginButton from "@/components/shared/LoginButton";

function Auth() {
   return (
      <div className="flex w-screen h-screen justify-center items-center bg-[url('https://buguard.io/_next/static/media/dark-hero.2a187db0.png')] bg-cover">
         <div className="card flex justify-center items-center w-[20%] h-[20%] backdrop-blur-2xl rounded-4xl flex-col gap-20 p-6 bg-red-400/20">
            <h1 className="text-white">You must login to continue!</h1>
            <LoginButton className="w-full" />
         </div>
      </div>
   );
}

export default Auth;
