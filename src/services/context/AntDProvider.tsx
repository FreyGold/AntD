import { type ReactNode } from "react";
import { ConfigProvider } from "antd";
import { useDarkLightContext } from "./DarkLightProvider";
import { ANTD_THEME_DARK, ANTD_THEME } from "../constants";

type AntDProviderProps = {
   children: ReactNode;
};
// usage:  const { token } = useToken();
const AntDProvider = ({ children }: AntDProviderProps) => {
   const { isDark } = useDarkLightContext();
   return (
      <ConfigProvider theme={isDark ? ANTD_THEME_DARK : ANTD_THEME}>
         {children}
      </ConfigProvider>
   );
};

export default AntDProvider;
