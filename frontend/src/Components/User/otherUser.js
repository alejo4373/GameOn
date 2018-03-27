import React from 'react';

export default class otherUser extends React.Component{
    constructor(){
        super()

        this.setState({
            user:null
        })
    }

    getUserInfo = () => {
        axios
          .get("/user/getinfo")
          .then(res => {
            console.log(res.data.user);
            this.setState({
              user: [res.data.user]
            });
          })
          .catch(err => console.log("Failed To Fetch User:", err));
      };

    componentDidMount(){
        this.getUserInfo()
    }
//might want to add more information
    render(){
        return(
            <div>
                <img src={user.image} alt="event"/>
                <h3>Username <span>{user.username}</span></h3>
                <h3>Zip Code <span>{user.zip_code}</span></h3>
                <h3>Exp <span>{user.exp_points}</span></h3>
            </div>
        )
    }
}