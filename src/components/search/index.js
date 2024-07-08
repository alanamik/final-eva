import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search.css';
import { Button, Form, InputGroup, Card } from 'react-bootstrap';

function Search(props) {

  const getInfo = () => {

    fetch(`https://api.github.com/users/${props.userName}`).then((response) => {
      if (response.status !== 200) {
        props.setCheckSearchedUser(-1);
        console.log("Status fetch" + response.status);
      } else {
        props.setCheckSearchedUser(1);
        return response.json();
      }
    }).then((data) => {
      if (props.checkSearchedUser === 1) {
        console.log(data);
        props.setSearchedUser(data);
      }
    });
  }

  return (

    <div className="Search">
      <Card className="bg-light text-white" >
        <Card.Body>
          <Form className="align-top">
            <InputGroup>
              <Form.Control onChange={(e) => {
                
                let checkWord = (e) => {
                  let word = e.target.value.trim().replace(/ +/g, '');
                  return word;
                }
                (props.setUserName(checkWord(e)));
                }}
                type="text"
                placeholder="Введите имя пользователя на github"
                aria-describedby="basic-addon2"
                name="nameUser"
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit" onClick={(e) => { e.preventDefault(); props.setCheckSearchedUser(0); props.setCheckSubs(0); getInfo() }}>Показать</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Card.Body>
      </Card>
    </div>

  );
}

export default Search;