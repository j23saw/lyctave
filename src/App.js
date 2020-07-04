import React from 'react';
import './App.css';
import LyricBar from './LyricBar';
import LyricBg from './LyricBg'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songname: "",
      lyrics: [],
      status:"",
      notes:[]
    }
    this.fetchLyrics = this.fetchLyrics.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({songname: event.target.value});  
  }

  fetchLyrics(event){
    event.preventDefault();
    this.setState({
      status: "Loading..."
    })
    fetch('https://ly8api.herokuapp.com/' + this.state.songname)
    .then(
      response => response.json()
    )
    .then(({seperatedNotes, filteredLyrics, success, notes}) => {
      if(success === 1){
        this.setState({
          lyrics: filteredLyrics,
          notes: notes
        })
      }
      this.setState({status:"Oops! Something Went Wrong."})
    })
  }


  render(){
    return(
      <div className="App" >
        <h1>
          Lyctave
        </h1>
        <br></br>
        <form onSubmit = {this.fetchLyrics}>
          <input type="text" value={this.state.songname} onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
        <LyricBar lyricArr = {(this.state.notes.length === 0)?this.state.status:this.state.notes} />        
        <LyricBg lyricCloud = {(this.state.lyrics.length === 0)?this.state.status:this.state.lyrics}/>
      </div>
    )
  }  
}

export default App;
