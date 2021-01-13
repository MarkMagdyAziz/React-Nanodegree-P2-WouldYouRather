import React from "react";
import {
  Container,
  Image,
  Grid,
  Header,
  Segment,
  Divider,
} from "semantic-ui-react";

const square = { width: 50, height: 50, backgroundColor: "#4EB5AD" };

const LeaderboardCard = (props) => {
  const { user } = props;
  let score = user.questions.length + Object.keys(user.answers).length;

  return (
    <Container fluid>
      <Segment color="teal">
        <Grid columns={2} stackable textAlign="center" padded celled centered>
          <Grid.Row>
            <Grid.Column width={12}>
              <Image
                alt={`Avatar of ${user.name}`}
                circular
                floated="left"
                size="tiny"
                src={user.avatarURL}
              />
              <Header textAlign="left" as="h1">
                {user.name}
              </Header>
              <Divider hidden />
              <Header as="h3" block dividing textAlign="center">
                Answered questions : {user.questions.length}
                <Divider />
                Answered questions : {Object.keys(user.answers).length}
              </Header>
            </Grid.Column>
            <Grid.Column width={2} verticalAlign="bottom">
              <Segment circular inverted style={square}>
                <Header as="h3" inverted>
                  Score
                  <br />
                  {score}
                </Header>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default LeaderboardCard;
