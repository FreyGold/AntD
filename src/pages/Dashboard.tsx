import ThemeToggleButton from "@/components/ToggleTheme";

function Dashboard() {
   return (
      <div className="w-full h-full flex justify-center items-center bg-background-dark text-text rounded-4xl">
         <ThemeToggleButton></ThemeToggleButton>
      </div>
   );
}

export default Dashboard;
