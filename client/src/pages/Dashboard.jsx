import React, { useState, useEffect } from "react";
import ProjectCard from "../components/Card";
import Styled, { useTheme } from "styled-components";
import { Add } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";
import { tagColors } from "../data/data";
import { useSelector, useDispatch } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { getProjects, userTasks } from "../api";

const Container = Styled.div`
  padding: 10px;
`;

const Section = Styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
`;

const Left = Styled.div`
  flex: 1.4;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Right = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopBar = Styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin: 20px 0;
`;

const CreateButton = Styled.div`
  padding: 20px 30px;
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  background: linear-gradient(76.35deg, #801AE6 15.89%, #A21AE6 89.75%);
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
  }

  ${({ btn }) =>
    btn === "team" &&
    `
    background: linear-gradient(76.35deg, #FFC107 15.89%, #FFC107 89.75%);
    &:hover {
      background: linear-gradient(76.35deg, #FFC107 15.89%, #FFC107 89.75%);
    }
  `}
`;

const Icon = Styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  padding: 4px;
`;

const StatsWrapper = Styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  gap: 24px;
`;

const StatCard = Styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 0px 25px rgba(0,0,0,0.25);
  }
`;

const Title = Styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Progress = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const ProgressText = Styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const Desc = Styled.div`
  font-size: 13px;
  margin-top: 6px;
`;

const Span = Styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const SectionTitle = Styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0 10px;
`;

const CardWrapper = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const RecentProjectsFull = Styled.div`
  width: 100%;
`;

function CircularProgressWithLabel(props) {
  const theme = useTheme();
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} thickness={6} size="60px" style={{ color: theme.primary }} />
      <Box
        sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: "absolute", display: "flex",
          alignItems: "center", justifyContent: "center"
        }}
      >
        <Typography variant="caption" component="div" color="inherit">
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

const Dashboard = ({ setNewProject, setNewTeam, newProject }) => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [totalProjectsDone, setTotalProjectsDone] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalTasksDone, setTotalTasksDone] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getProjectsData = async () => {
    setLoading(true);
    try {
      const res = await getProjects(token);
      setProjects(res.data);
    } catch (err) {
      dispatch(openSnackbar({
        message: err.response?.data?.message || "Error loading projects",
        severity: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  const getTasksData = async () => {
    setLoading(true);
    try {
      const res = await userTasks(token);
      setTasks(res.data);
    } catch (err) {
      dispatch(openSnackbar({
        message: err.response?.data?.message || "Error loading tasks",
        severity: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    const completedProjects = projects.filter(p => p.status?.toLowerCase() === "completed");
    const completedTasks = tasks.filter(t => t.status?.toLowerCase() === "completed");
    setTotalProjectsDone(completedProjects.length);
    setTotalProjects(projects.length);
    setTotalTasksDone(completedTasks.length);
    setTotalTasks(tasks.length);
  };

  useEffect(() => {
    getProjectsData();
    getTasksData();
    window.scrollTo(0, 0);
  }, [newProject]);

  useEffect(() => {
    calculateTotals();
  }, [projects, tasks]);

  return (
    <Container>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Section>
            <Left>
              <StatsWrapper>
                <StatCard>
                  <Title>Total Projects Done</Title>
                  <Progress>
                    <LinearProgress
                      sx={{ borderRadius: "10px", height: 7, width: "80%" }}
                      variant="determinate"
                      value={totalProjectsDone === 0 ? 0 : (totalProjectsDone / totalProjects) * 100}
                    />
                    <ProgressText>{totalProjectsDone}</ProgressText>
                  </Progress>
                  <Desc>Working on <Span>{totalProjects - totalProjectsDone}</Span> more projects</Desc>
                </StatCard>

                <StatCard>
                  <Title>Total Tasks Done</Title>
                  <Progress>
                    <LinearProgress
                      sx={{ borderRadius: "10px", height: 7, width: "80%" }}
                      variant="determinate"
                      value={totalTasksDone === 0 ? 0 : (totalTasksDone / totalTasks) * 100}
                      color="success"
                    />
                    <ProgressText>{totalTasksDone}</ProgressText>
                  </Progress>
                  <Desc><Span>{totalTasks - totalTasksDone}</Span> tasks remaining</Desc>
                </StatCard>
              </StatsWrapper>
            </Left>

            <Right>
              <TopBar>
                <CreateButton onClick={() => setNewProject(true)}>
                  <Icon><Add /></Icon>
                  Create New Project
                </CreateButton>
                <CreateButton btn="team" onClick={() => setNewTeam(true)}>
                  <Icon><Add style={{ color: "#FFC107" }} /></Icon>
                  Create New Team
                </CreateButton>
              </TopBar>
            </Right>
          </Section>

          <RecentProjectsFull>
            <SectionTitle>Recent Projects</SectionTitle>
            <CardWrapper>
              {projects
                .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
                .slice(0, 6)
                .map((project, id) => (
                  <ProjectCard
                    key={project._id}
                    item={project}
                    index={id}
                    status={project.status}
                    tagColor={tagColors[3]}
                    fromcomponent="dashboard"
                  />
                ))}
            </CardWrapper>
          </RecentProjectsFull>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
