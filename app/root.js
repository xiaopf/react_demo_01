import React from 'react';
import Header from './components/header';
import Player from './pages/player';
import List from './pages/list';
import {MUSIC_LIST} from '../musicList';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'




class Root extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            whichNum : 0,
            musicList : MUSIC_LIST,
            playTurn: 0,
            isPlay:false

        }

        this.nextSong = this.nextSong.bind(this)
        this. changePlayTurn = this. changePlayTurn.bind(this)
        this. togglePlayPause = this. togglePlayPause.bind(this)
        this. choiceSongs = this. choiceSongs.bind(this)
        this. deleteSongs = this. deleteSongs.bind(this)



       
    }

    componentDidMount(){



        $('#player').jPlayer({

          ready:function(){
              $(this).jPlayer('setMedia',{
                  mp3 : MUSIC_LIST[0].file
              }).jPlayer('pause')
          },
            supplied:'mp3',
            wmode:'window'
        });


        $('#player').bind($.jPlayer.event.ended, (e) => {
          this.nextSong()
        });
    }


    togglePlayPause(){
        if(this.state.isPlay){
            this.setState({
                isPlay : false
            })
            $('#player').jPlayer('pause');
        }else{
            this.setState({
                isPlay : true
            })
            $('#player').jPlayer('play');
        }
    }
















     nextSong(type){

    

      let nowWhichNum;
      let ML_len = MUSIC_LIST.length;

      switch(this.state.playTurn){
        case 0: //list
          nowWhichNum = type == 'next' ? (this.state.whichNum+1) % ML_len : (this.state.whichNum-1+ML_len) % ML_len;
        break;
        case 1: //random
        nowWhichNum = this.state.whichNum;
          nowWhichNum = Math.floor(Math.random()*(ML_len-1))
        break;
        case 2: //cycle
          nowWhichNum = this.state.whichNum;
        break;
      }

      


      this.setState({
        whichNum : nowWhichNum
      })
      
      let playStat = this.state.isPlay ? 'play' : 'pause';

      $('#player').jPlayer('setMedia',{mp3 : MUSIC_LIST[nowWhichNum].file}).jPlayer(playStat)

    }

    changePlayTurn(){
      this.setState({
          playTurn : (this.state.playTurn + 1) % 3
      })
    }

    choiceSongs(currentMusic){
      let index = MUSIC_LIST.indexOf(currentMusic)
      this.setState({
        whichNum: index,
        isPlay : true
      })

      $('#player').jPlayer('setMedia',{mp3 : MUSIC_LIST[index].file}).jPlayer('play')

    }

    deleteSongs(currentMusic){
        this.setState({
          musicList:  this.state.musicList.filter(function(ele) {
            return ele !== currentMusic;
          })
        })
 
    }


    render(){

        const Home = () => (
          <Player
            currentMusic={MUSIC_LIST[this.state.whichNum]} 
            playTurn = {this.state.playTurn}
            isPlay = {this.state.isPlay}
            onNextSong={this.nextSong} 
            onChangePlayTurn={this.changePlayTurn}
            onTogglePlayPause={this.togglePlayPause}
          />
        );

        const MList = () => (
          <List
            currentMusic={this.state.musicList[this.state.whichNum]}
            musicList={this.state.musicList}

            onChoiceSongs={this.choiceSongs}
            onDeleteSongs={this.deleteSongs}
          />
        );




        return(
            <Router>
              <div>
                <Header/>

                <Route exact path="/" component={Home}/>
                <Route path="/list" component={MList}/>

              </div>
            </Router>
        )
    }

}





export default Root;