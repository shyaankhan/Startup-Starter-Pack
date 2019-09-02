import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import * as LDClient from "launchdarkly-js-client-sdk";


class App extends React.Component{
  
  constructor() {
    super();
    this.state = {
      companyName: ["Uber", "Snapchat", "Facebook", "Zillow", "Airbnb", "DropBox", "Quora", "Yelp", "LinkedIn", 
      "Pinterest"],
      noun: ["Doctors", "Pilots", "Toothfairies","Chefs", "Cardiologists", "Fast Food Employees", "Priests"],
      currentCompanyName: "",
      currentNoun: "",
      featureFlag: ""  
    }
    this.generateNewIdea = this.generateNewIdea.bind(this)
    this.launchDarklyReady = this.launchDarklyReady.bind(this)
    this.generateNewIdea();
}

  componentDidMount() {
    var user = {
      "key": "aa0ceb"
    };
    this.ldclient = LDClient.initialize('5d6c9b11309d8408723ee4d7', user);
    this.ldclient.on('ready', this.launchDarklyReady);
  }

  launchDarklyReady() {
    var featureFlag = this.ldclient.variation('enable-new-feature')
    this.setState({featureFlag: featureFlag});
  }
  
  generateNewIdea(){
    let newName = this.state.companyName[Math.floor(Math.random() * Math.floor(this.state.companyName.length))]
    let newNoun = this.state.noun[Math.floor(Math.random() * Math.floor(this.state.noun.length))]
    if(this.state.currentCompanyName === ""){
      this.state.currentCompanyName = newName; 
      this.state.currentNoun = newNoun; 
    }
    else{
      this.setState({ currentCompanyName : newName, currentNoun : newNoun });
    }
  }

  newFeature() {
    if(!this.state.featureFlag){
      return (<div className="title">Create Your Pitch Deck <br></br>[Coming Soon]</div>);
    }else{
      return (
        <div>
          <div className="title">Create Your Pitch Deck</div>
          <div> Follow this template and your pitch deck will be complete!</div>
          <button className="btn"><a style={{textDecoration: 'none', color : '#000'}} href="https://docs.google.com/presentation/d/17wRgJpjHIyhtgglmn31CPL_O9h2oEdy80uodjd5iaQE/edit#slide=id.p">
          Pitch Deck Template</a>
          </button>
          <div className="step-text">Step 3:</div>
          <div className="title">Find Investors</div>
          Easily contact your favorite VC firm by clicking 'Email' and pressing send! <br></br>
          <button className="btn"><a style={{textDecoration: 'none', color : '#000'}} href={"mailto:iwantmoney@sequoiacapital.com?subject="+this.state.currentCompanyName+" for "+this.state.currentNoun+"&body=Hey there, "+
            "I'm seeking Series A Funding for our revolutionary new app, "+this.state.currentCompanyName+" for "+this.state.currentNoun+". Please give me money."}>Email</a>
          </button>
          <div style={{padding: '20px'}}>Congratulations, you did it! You've finally started your startup! It wasn't that bad now was it? Looking forward to seeing you at the New York Stock Exchange when you IPO!</div>
        </div>);
    }
      
  }

  render() {
    if(this.state.featureFlag === ""){
      return <div>Loading</div>
    }else{
      return (
        <div className="App">
          <div className="header" style={{padding:'20px',backgroundColor:'',
              fontWeight:'bold'}}>
            <div style={{fontSize:'45px'}}>Startup Starter Pack</div>
            <br></br>
            Startled by starting a startup?
            <br></br>
            Let us help you jumpstart your startup right here!
          </div>
          <div className="container">
          <div className="step-text">Step 1:</div>
          <div className="title">Come Up With An Idea</div>
            It's like 
            <div className="custom-text" style={{fontSize:'25px',fontWeight:'bold'}}>{this.state.currentCompanyName},</div>
            but for
            <div className="custom-text" style={{fontSize:'25px',fontWeight:'bold'}}>{this.state.currentNoun}</div>
        <button className="btn" onClick={this.generateNewIdea}> Try Something Else </button>
        <div style={{paddingTop:'20px'}}> Like this idea? Great! You're pretty much half way to a $100M valuation </div>
        <div className="step-text"> Step 2: </div>
        {this.newFeature()}
        </div>
        <div>Brought to you by: <a href="www.linkedin.com/in/shyaan"><i>Shyaan Khan</i></a></div>
        </div>
      );
    }
  }
}

export default App;
