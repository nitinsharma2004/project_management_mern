import { Fragment,  } from "react";
import styled from "styled-components";
import { TimelapseRounded } from "@mui/icons-material";
import { tagColors } from "../data/data";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { format } from 'timeago.js';

const Container = styled.div`
  padding: 14px 14px;
  text-align: left;
  margin: 12px 0px 8px 0px;
  font-size: 14px;
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

const Image = styled.img`
  height: 120px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  margin-top: 1px;
  margin-bottom: 8px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 15px;
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
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.soft2};
  margin-top: 8px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;


const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 6px;
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

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
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


const Card = ({ tagColor, item, index, status, handleUpdate, fromcomponent }) => {

  const completeTask = () => {

    console.log(item);
    handleUpdate(item._id, 'Completed');
  };


  return (
    <Fragment>
      <Link to={`/projects/${item._id}`} style={{ textDecoration: "none" }}>
        <CardContent item={item} completeTask={completeTask} fromcomponent={fromcomponent} />
      </Link>

    </Fragment>
  );
};

const CardContent = ({ item, completeTask, fromcomponent }) => {
  return (
    <Container className="item">
      {item.img && <Image src={item.img} />}
      <Top>
        <Title>{item.title}</Title>
      </Top>
      <Desc>{item.desc}</Desc>
      <Tags>
        {item.tags.map((tag) => (
          <Tag
            key={tag}
            tagColor={tagColors[Math.floor(Math.random() * tagColors.length)]}
          >
            {tag}
          </Tag>
        ))}
      </Tags>
      <Bottom>
        <Time>
          <TimelapseRounded sx={{ fontSize: '18px' }} /> Updated {format(item.updatedAt)}
        </Time>
        <AvatarGroup>
          {item?.members?.map((member) => {
            const imgSrc = member?.id?.img;
            const memberName = member?.id?.name || "U";

            return (
              <Avatar
                key={member?.id?._id || Math.random()} // fallback key
                sx={{ marginRight: "-12px", width: "34px", height: "34px" }}
                src={imgSrc ? imgSrc : undefined} // Don't pass null to src
              >
                {memberName.charAt(0)}
              </Avatar>
            );
          })}
        </AvatarGroup>

      {fromcomponent === "projects" && item.status === "Working" && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent Link navigation
            completeTask(); // Complete the task
          }}
        >
          Complete
        </button>
      )}
    </Bottom>
    </Container >
  );
};
export default Card;