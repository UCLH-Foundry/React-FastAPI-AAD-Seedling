import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './Components/AppLayout';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { HttpMethod, ResultType, useAuthApiCall } from './Hooks/useAuthApiCall';
import { AppRolesContext } from './Contexts/appRolesContext';
import Me from './Components/Me';
import { SecuredByRole } from './Components/SecuredByRole';
import { RoleName } from './Models/roles';
import Privacy from './Components/Privacy';
import Terms from './Components/Terms';
import Contact from './Components/Contact';
import { ToastContext } from './Contexts/toastContext';
import Home from './Components/Home';

const App: React.FC = () => {
  const [appRoles, setAppRoles] = useState([] as Array<string>); // the user is in these roles which apply across the app
  const apiCall = useAuthApiCall();
  const [haveRoles, setHaveRoles] = useState(false);
  const [toastBody, setToastBody] = useState(undefined as React.ReactNode)

  const header = <Header />;
  const footer = <Footer />;

  // get the user's roles from the token and set them in the context to be available to all child components
  useEffect(() => {
    const setAppRolesOnLoad = async () => {
      await apiCall("", HttpMethod.Get, undefined, ResultType.None, (roles: Array<string>) => {
        setAppRoles(roles);
        setHaveRoles(true);
      }, true);
    };
    setAppRolesOnLoad();
  }, [apiCall]);

  return (
    <AppRolesContext.Provider value={{
      roles: appRoles,
      setAppRoles: (roles: Array<string>) => { setAppRoles(roles) }
    }}>
      <ToastContext.Provider value={{
        toastBody: toastBody,
        setToastBody: (body: React.ReactNode) => { setToastBody(body) }
      }}>
        {
          haveRoles &&
          // TODO: Below is an example of restricting content to certain roles
          <SecuredByRole
            allowedRoles={[RoleName.User, RoleName.Admin]}
            errorString={"Sorry - you must be assigned to a User or Admin role to use this app. Please ask your friendly administrator to get you set up :)"}
            element={
              <AppLayout header={header} footer={footer}>
                <Routes>
                  <Route path="*" element={<Home />} />
                  <Route path="/me" element={<Me />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AppLayout >
            } />
        }
      </ToastContext.Provider>
    </AppRolesContext.Provider >
  );
};

export default App;
