import 'bootstrap/dist/css/bootstrap.min.css';


function Followers(props) {

return (
    <div className="Followers">
        {props.showSubscription(props.listOfFollowers)}
    </div>
  );
}

export default Followers;