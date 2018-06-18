import './style.scss';

import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

class GetGitRepo extends React.Component {
    constructor(){
      super();
      this.state = {
        userName: '',
        users: [],
        count:0,
        errorData: '',
        flag: true,
        showDetails: false
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.disableButton = this.disableButton.bind(this);
    }

    handleClick(){
      let username = this.state.userName; 
      const url = 'https://api.github.com/search/users?q='+username+'&sort=updated&order=desc';
      axios
        .get(url)
        .then((data)=> {
          this.setState({
            users: data.data.items,
            count: data.data.total_count,
            errorData:''
          })
        })
      .catch((err)=> {
         this.setState({
            errorData: err,
            users:''
        })
      })
    }

    disableButton(){
        if(this.state.userName.length > 0){
            this.setState({
                flag: false
            })
        }else{
            this.setState({
                flag: true
            })
        }
    }

    handleChange(event){
      this.setState({
        userName : event.target.value
      })
    }
    handleButtonClick(event){
      this.setState({
        showDetails : !this.state.showDetails
      })
    }

    render(){
        let responseData = " ";
        let userDetail;
        if(this.state.users.length > 0){
            let temp = this.state.users;
            responseData = temp.map((user) => {
              if(this.state.showDetails){
                userDetail=<div>Details</div>
              }
                return <div className="user-info" key={user.id}>
                  <img className="user-avatar" alt={user.login} src={user.avatar_url}/>
                  <div className="user-data">
                    <span>{user.login}</span>
                    <div>Profile URL: {user.url}</div>
                    <button onClick={this.handleButtonClick}>Details</button>
                    {userDetail}
                  </div>
                </div>
            })
        }else if(this.state.errorData){
            responseData = <li>user not foundd</li>
        } 
      return(
        <div>
            <div className="header-data">
              <input type="text" value={this.state.userName} onChange={this.handleChange} onKeyUp={this.disableButton}/>
              <button disabled={this.state.flag} onClick={this.handleClick}>click me</button>
            </div>
            <div className="box-data">
              <span>Total results:</span>
              <span>{this.state.count}</span>
              {responseData}
            </div>
        </div>
      )
    }
  }

render(<GetGitRepo />, document.getElementById('root'));
