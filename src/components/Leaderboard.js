import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import LeaderboardCard from "./LeaderboardCard";

const Leader = (props) => {
  const { sortedUsers } = props;

  return (
    <Container>
      <ul className="user-list">
        {sortedUsers.map((user) => (
          <li key={user.id}>
            <LeaderboardCard user={user} />
          </li>
        ))}
      </ul>
    </Container>
  );
};
function mapStateToProps({ users }) {
  const usersArray = Object.keys(users).map((key) => users[key]);
  const sortedUsers = usersArray.sort((a, b) => {
    const sumA = Object.keys(a.answers).length + a.questions.length;
    const sumB = Object.keys(b.answers).length + b.questions.length;
    return sumB - sumA;
  });

  return {
    users,
    sortedUsers,
  };
}
export default connect(mapStateToProps)(Leader);
