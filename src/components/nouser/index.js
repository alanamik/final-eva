import 'bootstrap/dist/css/bootstrap.min.css';
import './nouser.css';
import { Card } from 'react-bootstrap';

function NoUser(props) {
  return (
    <div className="NoUser">
      <Card className="text-center" border="light" >
        <Card.Body>
          <Card.Text>
            We couldn’t find any users matching '{props.userName}' :(
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NoUser;