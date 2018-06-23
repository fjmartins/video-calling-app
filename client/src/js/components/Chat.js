import React, { Component } from 'react';
import Message from './Message';
import Friend from './Friend';

import io from 'socket.io-client'
let socket = io(`http://localhost:4443`);

export default class Chat extends Component {

  constructor() {
    super();
    this.state = {
      username: "",
      loggedIn: false,
      messages: [],
      userlist: [],
    }

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.notify = this.notify.bind(this);
  }

  login() {
    socket.send({
      type: "login",
      name: this.state.username
    });

    this.setState({loggedIn: true});
  }

  componentDidMount() {
    socket.on('connect', function(data) {
      console.log('connected');
    });

    socket.on('notification', (message) => {
      var data = message;

      switch(data.type) {
        case "connection":
        this.notify(data.username + " has joined the room.");
        break;
        case "disconnection":
        this.notify(data.username + " has left the room.");
        break;
        default:
        break;
      }

      this.setState({userlist: data.userlist});
    });

    socket.on('userMessage', (data) => {
      switch(data.type) {
        case "text":
          this.receiveMessage(data.message);
        break;
        default:
        break;
      }
    });

    socket.on('message', (data) => {

      switch(data.type) {
        case "login":
          this.notify("Logged in as " + data.username);
          this.setState({userlist: data.userlist});
        break;
        default:
        break;
      }
      console.log(data.userlist);
    });
  }

  handleChange(event) {
      this.setState({username: event.target.value});
  }

  handleChangeMessage(event) {
      this.setState({message: event.target.value});
  }

  notify(message) {
    var messages = this.state.messages;
    messages.push(message);
    this.setState({messages: messages});
  }

  receiveMessage(message) {
    var messages = this.state.messages;
    messages.push(message.sender + ": " + message.text);
    this.setState({messages: messages});
  }

  sendMessage(message) {
    if(this.state.loggedIn) {
      socket.send({
        type: "text",
        text: this.state.message,
        sender: this.state.username,
      });
      var messages = this.state.messages;
      messages.push(this.state.username + "(you): " + this.state.message);
      this.setState({messages: messages});
      this.setState({message: ""});
    } else {
      alert("Please pick a username first");
    }
  }

  showLogin() {
    if(!this.state.loggedIn) {
      return (
        <div>
          <input type="text" value={this.state.username} onChange={this.handleChange} />
          <button onClick={this.login}>
            Login
          </button>
        </div>
      )
    }
  }

  showOnlineUsers() {
    if(this.state.loggedIn) {
      const Users = ({list}) => (
        <ul>
          {
            list.map((user, i) => <Friend key={i} text={"> "+ user.name} />)
          }
        </ul>
      );

      return (
        <div>
          <p>Online Users:</p>
          <Users list={this.state.userlist}/>
        </div>
      )
    }
  }

  render() {
    const Messages = ({items}) => (
      <ul>
        {
          items.map((item, i) => <Message key={i} text={item} />)
        }
      </ul>
    );



    return (
      <div>
        {this.showLogin()}
        <Messages items={this.state.messages} />
        <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
        <button onClick={this.sendMessage}>
          Send
        </button>
        {this.showOnlineUsers()}
      </div>
    );
  }
}
