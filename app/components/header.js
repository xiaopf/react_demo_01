import React from 'react';
import './header.less';

class Header extends React.Component{
	constructor(){
		super();
	}
    

	render(){
		return(
           <div className="component-header">

              <div className="row">
	              <p className="fa fa-music col-md-2 col-sm-2"></p>
	              <p className="col-md-8 col-xs-8">React Music</p>
              </div> 

              <div id="player"></div>
           </div>
		)
	}
}







export default Header;