import React, { useEffect } from "react";
import Landing from "./Landing";
import Trigger from "./Trigger";
import Mapping from "./Mapping";
import Dashboard from "./Dashboard";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";
import { useSparrowContext } from "../context/SparrowContext";
import { useJiraContext } from "../context/JiraContext";
import { useStorageContext } from "../context/StorageContext";
import { view } from '@forge/bridge';


const Main = () => {
  const { currentPage, loading, changePage, setLoading } = useAppContext();
  const { checkAuthStatus, isConnected } = useAuthContext();
  const { getAllSurveys } = useSparrowContext();
  const { getAllJiraProjects } = useJiraContext();
  const { getAllMappings, getAllTriggers } = useStorageContext();

  const pageComponents = {
    "4": <Trigger />,
    "3": <Mapping />,
    "2": <Dashboard />,
    "1": <Landing />,
  };
  useEffect(async () => {
    await view.theme.enable();
}, []);

  useEffect(() => {
    checkAuthStatus();
  }, [changePage]);

  useEffect(() => {
    setLoading(true);
    initializePageData();
  }, [currentPage]);

  const initializePageData = async () => {
    try {
      if (currentPage?.id === 4 || currentPage?.id === 3) {
        await getAllSurveys();
        await getAllJiraProjects();
      } else if (currentPage?.id === 2) {
        await getAllMappings();
        await getAllTriggers();
      }
    } catch (error) {
      console.error("Error initializing page data:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentComponent = pageComponents[`${currentPage?.id}`] || <Landing />;

  return (
    <>
    {console.log(isConnected)}
      {loading ? (
        <Loader />
      ) : (
        <>{!isConnected ? <Landing /> : <>{currentComponent}</>}</>
      )}
    </>
  );
};

export default Main;
