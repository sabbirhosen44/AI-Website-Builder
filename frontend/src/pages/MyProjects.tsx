import LoadingSpinner from "@/components/LoadingSpinner";
import type { Project } from "@/types";
import { useEffect, useState } from "react";

const MyProjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {};

  useEffect(() => {
    fetchProjects();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  return <div>{projects.length > 0 ? <div></div> : <div></div>}</div>;
};

export default MyProjects;
