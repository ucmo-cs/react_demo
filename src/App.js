import './App.css';
import React, {Component} from 'react'
import Subject from "./component/Subject"
import TOC from "./component/TOC"
import ReadContent from "./component/ReadContent"
import Control from "./component/Control"
import CreateContent from "./component/CreateContent"
import UpdateContent from "./component/UpdateContent"


class App extends Component{

  constructor(props){
    super(props);
    this.max_id = 3;
    this.state ={
       
      mode: 'create',
      selectec_id:1,
      subject:{title : 'SE4920', sub: 'Senior Project'}, 
      welcome:{title : 'Welcome', desc : 'Hello ReactJS !!!'},

      contents:[
        {id:1, title:"SpringBoot", desc:"MVC framework"},
        {id:2, title:"ReactJS", desc:"front-end programming"},
        {id:3, title:"Agile", desc:"SCRUM, LEAN, KANBAN"}
      ]
    }
  }

  getReadContent(){
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      
      if(data.id === this.state.selected_id){
        return data;
        //break;
      }
      
      i = i + 1;
    }
  }

  getContent(){

    var _title, _desc, _component= null;
    if(this.state.mode === '1'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _component = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === '2'){

      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        
        if(data.id === this.state.selected_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        
        i = i + 1;
      }
      _component = <ReadContent title={_title} desc={_desc}></ReadContent>

    }else if(this.state.mode ==='create'){
      _component = <CreateContent onSubmit={function(_title, _desc){
      this.max_id = this.max_id + 1;

      //this.state.contents.push({id:this.max_id, title:_title, desc:_desc});
      //concat
      var _contents = this.state.contents.concat({id:this.max_id, title:_title, desc:_desc});    
       
      this.setState({
        contents:_contents
      });


      }.bind(this)}>
      
      </CreateContent>


    }else if(this.state.mode ==='update'){

      var _content = this.getReadContent();
      _component = <UpdateContent data={_content}
      onSubmit = {function(_id, _title, _desc){

       //this.state.contents
       // {id:1, title:"SpringBoot", desc:"MVC framework"},
       // {id:2, title:"ReactJS", desc:"front-end programming"},
       // {id:3, title:"Agile", desc:"SCRUM, LEAN, KANBAN"}


       //_contents
       // {id:1, title:"SpringBoot", desc:"MVC framework"},
       // {id:2, title:"ReactJS", desc:"front-end programming"},
       // {id:3, title:"Agile", desc:"SCRUM, LEAN, KANBAN"}

      var _contents = Array.from(this.state.contents);  

      var i = 0;
      while(i < _contents.length){
        if(_contents[i].id == _id){
          _contents[i] = {id:_id, title:_title, desc:_desc}
        }
        i = i + 1;
      }  

      this.setState({
        contents : _contents
      });

      }.bind(this)}
      
      
      
      
      
      ></UpdateContent>

    }

    return _component;
  }

  render(){
    return(
      <div className="App">
        <Subject title = {this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage = {function(){

          this.setState({
            mode:'2'
          }); 

        }.bind(this)}
        ></Subject>
        

        {/* <header>
          <h1><a href="/" onClick={function(e){

            e.preventDefault();
            //this.state.mode = '2';
            this.setState({
              mode:'2'
            }); 
            
          }.bind(this)}
          >  
          {this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>     */}


        <TOC onChangePage ={function(id){

          this.setState({
            mode:'2',
            selected_id:Number(id)
          }); 
        
        }.bind(this)} data={this.state.contents}>

        </TOC>

        <Control onChangeMode={function(_mode){
            this.setState({
              mode:_mode
            });

        }.bind(this)}></Control>  

       

        {this.getContent()}

      </div>
    );
  }
}



export default App;
