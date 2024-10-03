import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-5 bg-gray-200 my-7 rounded-md">
      <h1 className="text-4xl font-bold text-center mb-10">Projects</h1>

      <div className="flex justify-center mb-10">
        <Link
          to="/projects/new"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Create New Project
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Existing Projects</h2>

        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project._id}>
                <Link
                  to={`/projects/${project._id}`}
                  className="text-blue-600 hover:underline text-lg"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects available. Create a new project to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
