import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { AppProvider as InAppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import { TriggerProvider } from "./context/TriggerContext";
import { StorageProvider } from "./context/StorageContext";
import { JiraProvider } from "./context/JiraContext";
import { SparrowProvider } from "./context/SparrowContext";
import { MappingsProvider } from "./context/MappingsContext";
import Main from "./pages/Main";
import AppProvider from '@atlaskit/app-provider';
import { view } from "@forge/bridge";
import '@atlaskit/css-reset';
import "./styles/index.css";
import IssueContextPage from "./pages/IssueContext"
const App = () => {
  const [location, setLocation] = useState("");

  // useEffect(() => {
  //   view.getContext().then((context) => {
  //     setLocation(context.moduleKey);
  //   });
  // }, []);
  return (
    <InAppProvider>
      <SparrowProvider>
        <AuthProvider>
          <MappingsProvider>
            <DashboardProvider>
              <TriggerProvider>
                <StorageProvider>
                  <JiraProvider>
                    <Main />
                    {/* {location === "surveysparrow-issue-context" && <IssueContextPage />}
                    {location === "surveysparrow-project-page" && <Main />} */}
                    {/* {location === "surveysparrow-issue-panel" && <IssuePanelPage />} */}
                  </JiraProvider>
                </StorageProvider>
              </TriggerProvider>
            </DashboardProvider>
          </MappingsProvider>
        </AuthProvider>
      </SparrowProvider>
    </InAppProvider>
  );
};


ReactDOM.render(
  <AppProvider defaultColorMode='auto'>
    {/* <div className='custom-container'> */}
      <App />
    {/* </div> */}
  </AppProvider>,
  document.getElementById('root')
);
// const root = createRoot(document.getElementById('root'));
// root.render(
//   <AppProvider defaultColorMode='auto'>
//     <App />
//   </AppProvider>
// );
