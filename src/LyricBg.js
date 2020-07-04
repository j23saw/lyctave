import React, {Component} from 'react'
import p5 from 'p5';
import 'p5/lib/addons/p5.sound.js';
import 'p5/lib/addons/p5.dom'

class LyricBg extends Component{
    constructor(props){
        super(props)
        this.state = {
            wordCloud: []
        }
        this.myRef = React.createRef()
    }

    sketch = (p) => {
        let mic
        p.setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight)
            canvas.position(0, 0);
            canvas.style('z-index', '-1');
            mic = new p5.AudioIn();
            mic.start();
            p.background(255)
            p.textAlign(p.CENTER, p.CENTER)
        }
    
        p.draw = () => {
            p.background(255);
            let vol = mic.getLevel();
            p.fill(100, p.constrain(vol*p.width, 0, 255), 100);
            //p.ellipse(p.width / 2, p.height / 2, p.map(vol, 0, 1, 0, p.width));
            let i = 225;
            let cloud = (this.state.wordCloud.length !== 0 && (this.state.wordCloud !== "Loading...") && this.state.wordCloud !=="Oops! Something Went Wrong.")?this.state.wordCloud:[]
            cloud.forEach(element => {
                p.textSize(15)
                p.text(element, p.mouseX, i)
                i += 20
            });
            
        }
    
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }    
    }
    
    componentDidMount(){
        this.myP5 = new p5(this.sketch, this.myRef.current)
    }

    componentDidUpdate(prevProps){
        if(prevProps.lyricCloud !== this.props.lyricCloud){
            this.setState({
                wordCloud: this.props.lyricCloud
            })
        }
    }

    render(){
        return(
            <div ref = {this.myRef}>
            </div>
        )
    }
}

export default LyricBg