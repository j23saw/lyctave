import React, {Component} from 'react';

class LyricBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            index: 0
        }
    }

    nextLyrics = (e) => {
        const {index} = this.state
        let buttons = document.querySelectorAll(".buttons")
        if(index === this.props.lyricArr.length - 2){
            buttons[1].disabled = true
        }
        if(index >= 0){
            buttons[0].disabled = false
        }
        this.setState({
            index: index + 1
        })   
    }

    prevLyrics = (e) => {
        const {index} = this.state
        let buttons = document.querySelectorAll(".buttons")
        if(index === 1){
            buttons[0].disabled = true
        }
        else{
            buttons[0].disabled = false
        }
        if(index <= this.props.lyricArr.length - 1){
            buttons[1].disabled = false
        }
        this.setState({
            index: index - 1
        })
        console.log(index)  
    }

    componentDidMount(){
        let buttons = document.querySelectorAll(".buttons")
        buttons.forEach(button => {
            button.disabled = true
        });    
    }


    
    render(){
        return(
            <div>
                <p>
                    {(this.props.lyricArr === "Loading..." || this.props.lyricArr === "Oops! Something Went Wrong.")?this.props.lyricArr:this.props.lyricArr[this.state.index]}
                </p>
                <div>
                    <button className = "buttons" onClick = {this.prevLyrics} >
                        Prev
                    </button>
                    <button className = "buttons" onClick = {this.nextLyrics} disabled = {(this.props.lyricArr === "Loading..." || this.props.lyricArr === "Oops! Something Went Wrong.")?true:false}>
                        Next
                    </button>
                </div>
            </div>
        )
        
    }
}

export default LyricBar