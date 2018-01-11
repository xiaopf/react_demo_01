import React from 'react';
import './progress.less';

class Progress extends React.Component{

	constructor(props){
		super(props);
		this.changeProgress = this.changeProgress.bind(this)
	}

    changeProgress (e) {
        let progressBar = this.refs.progressBar;
        let targetPosition = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.onChangeProgress && this.props.onChangeProgress(targetPosition);
    }
    
	render(){
		return(
           <div className="component-progress row" onClick = { this.changeProgress } ref="progressBar">
				<div className="col-md-12" style={{width:`${this.props.progress}%`,background:this.props.barColor}}>
				</div>
           </div>
		)
	}
}







export default Progress;