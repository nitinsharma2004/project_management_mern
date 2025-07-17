import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "../components/Card";
import { statuses, data, tagColors } from "../data/data";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useCookies } from "react-cookie";
import { getProjects } from "../api/index";
import { CircularProgress } from "@mui/material";
import {API} from "../api/index"; 
const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 24px;
`;

const CreateButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  background-color: #801ae6;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6515b3;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.text};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;

  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet */
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr; /* Mobile */
  }
`;


const Projects = ({newProject,setNewProject}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);


  const token = localStorage.getItem("token");
  console.log(token)

  const handleUpdate = async (workId, newStatus) => {
    console.log(workId);
    const dataToUpdate = {
      workId: workId,
      newStatus: newStatus
    };
  
    try {
      const response = await API.post('/project/update-project-data', dataToUpdate);
      alert(response.data.message);
      getProjects();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Error updating task status');
    }
  };
  
  
  const getprojects = async () => {
    await getProjects(token)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          openSnackbar({
            message: err.response.data.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    getprojects();
    window.scrollTo(0, 0);
    for (let i = 0; i < data.length; i++) {
      if (data[i].works && data[i].works.length > 0) {
        data[i].status = "Working";
      }
    }
  }, [newProject, currentUser]);


  return (
    <Container>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <TopBar>
            <CreateButton onClick={() => setNewProject(true)}>+ Create New Project</CreateButton>
          </TopBar>

          {statuses.map((s, index) => {
            const filteredData = data
              .filter((item) => item.status === s.status)
              .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

            if (filteredData.length === 0) return null;

            return (
              <Section key={index}>
                <SectionTitle>
                  {s.icon} {s.status} ({filteredData.length})
                </SectionTitle>
                <CardGrid>
                  {filteredData.map((item, idx) => (
                    <Item
                      key={item._id}
                      item={item}
                      index={idx}
                      status={s}
                      tagColor={tagColors[3]}
                      handleUpdate={handleUpdate}
                      fromcomponent="projects"
                    />
                  ))}
                </CardGrid>
              </Section>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default Projects;

