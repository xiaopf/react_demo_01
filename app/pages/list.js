import React from 'react';
import './list.less';
import MusicListItem from '../components/MusicListItem';


class List extends React.Component{
	constructor(props){
		super(props);
        this.choiceSong = this.choiceSong.bind(this)
        this.deleteSong = this.deleteSong.bind(this)
	}

    choiceSong(currentMusic){
        this.props.onChoiceSongs(currentMusic)
    }

    deleteSong(currentMusic){
        this.props.onDeleteSongs(currentMusic)
    }


	render(){
        


        let listIt = null;
        let currentMusic = this.props.currentMusic;
        listIt = this.props.musicList.map(

            (elem,index,cc) => 
            (
                <MusicListItem 
                key={elem.id} 
                i = {index+1}
                musicListItem ={elem} 
                focus = { elem.id ===  currentMusic.id ? true : false}

                onChoiceSong={this.choiceSong}
                onDeleteSong={this.deleteSong}

                >{elem.title}</MusicListItem>
            
            )
        )

		return(
           <ul>
               { listIt }
           </ul>
		)
	}


}







export default List;