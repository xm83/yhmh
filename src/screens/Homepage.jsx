import React, {Component} from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <Link to="/login">Login</Link>
  </div>
);

export default HomePage;
//
// export default class Homepage extends Component {
//   constructor(props){
//     super(props);
//     this.state = {}
//   }
//
//   render() {
//     return (<div>
//       <Button variant="contained" onClick={this.onCreate}>Create</Button><br/>
//       <TextField id="docId" label="Join Doc" value={this.state.docId} onChange={this.onChange('docId')} margin="normal"/>
//       <Button variant="contained" onClick={this.onJoin}>Join</Button><br/>
//       <Button variant="contained" onClick={this.onLogout}>Logout</Button><br/>
//     </div>)
//   }
// }
