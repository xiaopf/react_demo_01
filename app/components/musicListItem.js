import React from 'react';
import './musicListItem.less';

class MusicListItem extends React.Component{
	constructor(props){
		super(props);

		this.choiceSong=this.choiceSong.bind(this)
		this.deleteSong=this.deleteSong.bind(this)
	}
    
    choiceSong(){
        this.props.onChoiceSong(this.props.musicListItem)
    }

    deleteSong(e){
    	e.stopPropagation();
    	this.props.onDeleteSong(this.props.musicListItem)
    }

	render(){
		return(

           <li className={`component-musicListItem ${this.props.focus ? 'focus' : ''}`}
	            onClick = {this.choiceSong}
           >
              <p>{this.props.i}. {this.props.musicListItem.title} - {this.props.musicListItem.artist}</p>
              <p className="fa fa-times" 
                onClick = {this.deleteSong}
              ></p>
           </li>
		)
	}
}







export default MusicListItem;