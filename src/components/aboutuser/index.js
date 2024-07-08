import Followers from './followers.js';
import Following from './following.js';
import Orgs from './orgs.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './aboutuser.css';
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Nav, Container, Row, Col, CardColumns } from 'react-bootstrap';


function AboutUser(props) {

  const [listOfFollowers, setListOfFollowers] = useState([]);
  const [listOfFollowing, setListOfFollowing] = useState([]);
  const [listOfOrgs, setListOfOrgs] = useState([]);

  //   Fetch-запрос для подписок

  async function getSubs(url, setArr, arr) {
    let response = await fetch(url);
    let answer;
    if (response.ok) {
      answer = await response.json();
    } else {
      console.log("Fetch-getSubs error: " + response.status);
    }
    let data = [];

    console.log(JSON.stringify(answer));

    answer.forEach(function (item) {
      let elem = { name: `${item.name}`, login: `${item.login}`, avatar: `${item.avatar_url}`, gitURL: `${item.html_url}` }
      data.push(elem);
    });
    setArr(data);
    console.log("listOfSubs fetch" + arr);
  }

  // Формирование карточки пользователя 

  let showCompany = () => {
    if (props.searchedUser.company !== null) {
      return (<ListGroup.Item>{props.searchedUser.company} </ListGroup.Item>);
    }
  }
  let showLocation = () => {
    if (props.searchedUser.location !== (null || "")) {
      return (<ListGroup.Item>{props.searchedUser.location} </ListGroup.Item>);
    }
  }

  let showBlog = () => {
    if (props.searchedUser.blog !== "") {
      return (<ListGroup.Item>{props.searchedUser.blog} </ListGroup.Item>);
    }
  }

  let showEmail = () => {
    if (props.searchedUser.email !== null) {
      return (<ListGroup.Item>{props.searchedUser.email} </ListGroup.Item>);
    }
  }

  let showTwitter = () => {
    if (props.searchedUser.twitter_username !== null) {
      return (<ListGroup.Item>@{props.searchedUser.twitter_username} </ListGroup.Item>);
    }
  }

  let showBio = () => {
    if (props.searchedUser.bio !== null) {
      return (
        <Card.Text>{props.searchedUser.bio}</Card.Text>
      );
    }
  }

  // Изменение названия вкладки

  useEffect(() => {
    if (props.searchedUser.name === undefined) {
      document.title = `Найти пользователя на Github`;
    }
    else {
      document.title = `${props.searchedUser.name} на Github`;
    }
  });

  // Проверка htpp-ссылки на GitHub

  let checkHref = (elem) => {

    if (elem.gitURL === "undefined") {
      return (
        <div>
          <img src={elem.avatar} alt="No avatar" width="150" height="150" />
          <p>{elem.login}</p>
        </div>

      );
    }
    else {
      return (
        <div>
          <a href={elem.gitURL}>  <img src={elem.avatar} alt="No avatar" width="150" height="150" /> </a>
          <a href={elem.gitURL}> {elem.login} </a>
        </div>
      )
    }
  }

  // Вывод подписок

  let showSubscription = (arr) => {

    return (

      <CardColumns>

        {arr.map((item, index) => (
          <Card id="subProfile" key={index} style={{ width: '10rem' }}>
            <Card.Body>
              {checkHref(item)}
            </Card.Body>
          </Card>
        ))}

      </CardColumns>
    );
  }


  return (
    <div className="AboutUser" key={props.searchedUser}>
      <Container fluid>
        <Row>
          <Col md="auto" style={{ padding: '20px' }}>
            <Card style={{ width: '20rem' }}>
              <Card.Img src={props.searchedUser.avatar_url} />
              <Card.Body id="BioOfUserCard">
                <Card.Title >{props.searchedUser.name}</Card.Title>
                <p >{props.searchedUser.login}</p>
                {showBio()}
              </Card.Body>
              <Card.Body id="ContactsOfUserCard">
                <ListGroup variant="flush">
                  {showCompany()}
                  {showLocation()}
                  {showBlog()}
                  {showEmail()}
                  {showTwitter()}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <div className="userActivity">
              <Nav variant="tabs" >
                <Nav.Item>
                  <Nav.Link onClick={(e) => { e.preventDefault(); props.setCheckSubs(1); getSubs(`https://api.github.com/users/${props.searchedUser.login}/following`, setListOfFollowing, listOfFollowing); }}>Following ({props.searchedUser.following})</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={(e) => { e.preventDefault(); props.setCheckSubs(2); getSubs(`${props.searchedUser.followers_url}`, setListOfFollowers, listOfFollowers); }}>Followers ({props.searchedUser.followers}) </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={(e) => { e.preventDefault(); props.setCheckSubs(3); getSubs(`https://api.github.com/users/${props.searchedUser.login}/orgs`, setListOfOrgs, listOfOrgs) }}>Organizations</Nav.Link>
                </Nav.Item>
              </Nav>
              <div>
                {((props.checkSubs === 0) && (<div></div>))}
                {((props.checkSubs === 1) && (<Following showSubscription={showSubscription} listOfFollowing={listOfFollowing} />))}
                {((props.checkSubs === 2) && (<Followers showSubscription={showSubscription} listOfFollowers={listOfFollowers} />))}
                {((props.checkSubs === 3) && (<Orgs showSubscription={showSubscription} listOfOrgs={listOfOrgs} />))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutUser;