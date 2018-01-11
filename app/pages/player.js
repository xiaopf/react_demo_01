import React from 'react';
import './player.less';
import Progress from '../components/progress';
import {Link} from 'react-router-dom'

let duration = null;
class Player extends React.Component{
	constructor(){
		super();

		this.state={
			progress:'',
            toggleVP: 'none',
            volume:'',
            leftTime: ''
            
		}

		this.changeProgress = this.changeProgress.bind(this)
        this.showVP = this.showVP.bind(this)   
        this.hideVP = this.hideVP.bind(this)   
        this.changeVolume = this.changeVolume.bind(this)  
        this.togglePlayPause = this.togglePlayPause.bind(this)  
        this.changePlayTurn = this.changePlayTurn.bind(this)  
        this.preSong = this.preSong.bind(this)  
        this.nextSong = this.nextSong.bind(this)  
        this.formatTime = this.formatTime.bind(this)  



	}
    

	componentDidMount(){

		$('#player').bind($.jPlayer.event.timeupdate, (e) => {
			duration = e.jPlayer.status.duration;
			this.setState({
				progress:Math.round(e.jPlayer.status.currentPercentAbsolute),
                volume: e.jPlayer.options.volume * 100,
                leftTime:this.formatTime(duration * (1-e.jPlayer.status.currentPercentAbsolute/100))
			})
		})
	}



    componentWillUnmount(){
    	$("#player").unbind($.jPlayer.event.timeupdate)
    }

    changeProgress(targetPosition){
    	let time = Math.floor(targetPosition*duration);
    	$("#player").jPlayer("play", time)
    }

    changeVolume(targetPosition){
        $("#player").jPlayer("volume", targetPosition)
    }

    showVP(){
        this.setState({
            toggleVP : 'inline-block'
         })
    }
    hideVP(){
        this.setState({
            toggleVP : 'none'
        })
    }

    togglePlayPause(){
        this.props.onTogglePlayPause()
    }

    changePlayTurn(){
        this.props.onChangePlayTurn && this.props.onChangePlayTurn()
    }

    preSong(){
        this.props.onNextSong && this.props.onNextSong('pre')
    }

    nextSong(){
        this.props.onNextSong && this.props.onNextSong('next')
    }
    
    formatTime(time){
        let min = Math.floor(time/60);
        let sec = Math.floor(time%60);

        return `${min > 10 ? min : '0' + min}:${sec > 10 ? sec : '0' + sec}`

    }





	render(){
		return(
           <div className="component-player">
                <Progress progress = {this.state.progress} onChangeProgress = {this.changeProgress}  barColor = 'red'></Progress>
                <div className="main_wrap">
                    <div className="left_content">
                        <p className="my_grange" href=""><Link to="/list">我的私人音乐库></Link></p>
                        <p className="song_title" href=""><span>{this.props.currentMusic.title}</span></p>
                        <p className="singer" href=""><span>{this.props.currentMusic.artist}</span></p>
                        <div className="volume" onMouseOver = {this.showVP} onMouseOut = {this.hideVP}>
                            <div className="fa fa-volume-up"></div>
                            <div className="volume_progress" style={{display:`${this.state.toggleVP}`}}>
                                <Progress progress = {this.state.volume} onChangeProgress = {this.changeVolume}   barColor = 'black'></Progress>
                            </div>
                        </div>
                        <div className="left_time">-{this.state.leftTime}</div>
                        <div className="second_progress">
			                <Progress progress = {this.state.progress} onChangeProgress = {this.changeProgress}   barColor = '#2f9842'></Progress>
                        </div>
                        <div className="play_contrl">
                            <button className="fa fa-step-backward backward" onClick = {this.preSong}></button>
                            <button className={`fa fa-play play_contrl ${ this.props.isPlay ? 'fa-pause' : 'fa-play'}`} onClick = {this.togglePlayPause}></button>
                            <button className="fa fa-step-forward forward" onClick = {this.nextSong}></button>
                            <button className={`play_turn fa ${ this.props.playTurnStyle[this.props.playTurn] }`} onClick={this.changePlayTurn}></button>
                        </div>
                    </div>
                    <div className="right_content">
                        <a className="song_cover" href="">
	                        <img src={this.props.currentMusic.cover} alt="" />
                        </a>
                    </div>
                </div>
           </div>
		)
	}
}

Player.defaultProps={
    playTurnStyle:['fa-list','fa-random','fa-refresh']
}





export default Player;