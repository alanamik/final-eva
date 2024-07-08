import 'bootstrap/dist/css/bootstrap.min.css';


function Following(props) {

return (
    <div className="Following">
        {props.showSubscription(props.listOfFollowing)}
    </div>
  );
}

export default Following;