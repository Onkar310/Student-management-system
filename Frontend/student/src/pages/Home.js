import { useEffect, useState } from "react";
import Students from "../components/Students";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const [student, setStudent] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const data = async () => {
      const response = await fetch("http://localhost:3001/api/students", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setStudent(json);
      }
    };
    data();
  }, []);

  return (
    <div className="home">
      <div className="students">
        {student &&
          student.map((student, index) => (
            <Students key={index} student={student} />
          ))}
      </div>
    </div>
  );
}

export default Home;
