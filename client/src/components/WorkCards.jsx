import React, { useEffect } from "react";
import {  useState } from "react";
import styled from "styled-components";
import {
  MoreVert,
  TimelapseRounded,
  StarsRounded
} from "@mui/icons-material";
import LinearProgress, {
} from "@mui/material/LinearProgress";
import { format } from "timeago.js";
import { tagColors } from "../data/data";

import { Avatar, IconButton } from "@mui/material";

const Container = styled.div`
  padding: 14px;
  text-align: left;
  margin: 2px 0px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.09);
  &:hover {
    transition: all 0.6s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.5);
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin-top: 6px;
  flex: 7;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Desc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin-top: 4px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const Progress = styled.div`
  position: relative;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin: 14px 0px 10px 0px;
  line-height: 1.5;
  overflow: hidden;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 4px;
  margin-top: 8px;
`;

const Tag = styled.div`
  padding: 4px 10px;
  border-radius: 8px;
  color: ${({ tagColor, theme }) => tagColor + theme.lightAdd};
  background-color: ${({ tagColor, theme }) => tagColor + "10"};
  font-size: 10px;
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.soft2};
  line-height: 1.5;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px 14px 0px;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2 + "99"};
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
`;
const IcoBtn = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft} !important;
`;

const WorkCards = ({ status, work ,handleUpdate,from }) => {
  const [color, setColor] = useState("primary");
  const [task, setTask] = useState(work.tasks);
  const [tag, setTag] = useState(work.tags);
  const [completed, setCompleted] = useState(0);
  const [progress, setProgress] = useState(0);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (status === "Completed") {
      setColor("success");
    }
  }, [status]);

  const completeTask = () => {
    
   console.log(work);
    handleUpdate(work._id,task[0]._id,'Completed'); 
  };
  useEffect(() => {

    let count = 0;
    let Members = [];
    task.forEach((item) => {
      if (item.status === "Completed") {
        count++;
      }
      if (item.members.length > 0) {
        item.members.forEach((items) => {
          let isPresent = Members.some((member) => member._id === items._id);
          if (!isPresent) {
            Members.push(items);
          }
        });
      }
    });
    setCompleted(count);
    setProgress(completed);
    setMembers(Members);
  }, [task]);
  return (
    <Container className={"item"}>
      <Top>
        <Title>{work.title}</Title>
        {work.priority === "Low" &&
          <StarsRounded sx={{ 'font-size': '18px' }} style={{ 'color': '#E67E22' }} />}
        <IcoBtn>
          <MoreVert style={{ flex: "1", fontSize: '20px' }} />
        </IcoBtn>
      </Top>
      <Desc>{work.desc}</Desc>
      <Tags>
        {tag.map((tag) => (
          <Tag
            tagColor={tagColors[Math.floor(Math.random() * tagColors.length)]}
          >
            {tag}
          </Tag>
        ))}
      </Tags>
      <Progress>
        <Text>
          Tasks Completed
          <Span>
            {completed} / {task.length}
          </Span>
        </Text>
        <LinearProgress
          sx={{ borderRadius: "10px", height: 3 }}
          variant="determinate"
          value={(completed / task.length) * 100}
          color={color}
        />
      </Progress>
      <Bottom>
        <Time>
          <TimelapseRounded sx={{ fontSize: "22px" }} /> Updated{" "}
          {format(work.updatedAt)}
        </Time>
        <AvatarGroup>
          {members.slice(0, 2).map((member) => (
            <Avatar
              sx={{
                marginRight: "-13px",
                width: "26px",
                height: "26px",
                fontSize: "16px",
              }}
              src={member.img}
            >
              {member.name.charAt(0)}
            </Avatar>
          ))}
          {members.length > 2 && (
            <Avatar
              sx={{
                marginRight: "-13px",
                width: "26px",
                height: "26px",
                fontSize: "12px",
              }}
            >
              +{members.length - 2}
            </Avatar>
          )}
        </AvatarGroup>
      </Bottom>
      {work.status !== "Completed" && from === "works" ? (
  <button onClick={(e) => { e.stopPropagation(); completeTask(); }}>Complete</button>
) : null}

    </Container>
  );
};

export default WorkCards;
