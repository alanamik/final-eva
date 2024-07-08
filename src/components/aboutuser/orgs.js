import 'bootstrap/dist/css/bootstrap.min.css';


function Orgs(props) {

return (
    <div className="Followers">
        {props.showSubscription(props.listOfOrgs)}
    </div>
  );
}

export default Orgs;