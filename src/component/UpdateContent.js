import React, {Component} from 'react'

class UpdateContent extends Component{

    constructor(props){
      super(props);
      this.state = {
        id:this.props.data.id,
        title:this.props.data.title,
        desc:this.props.data.desc

      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    
    inputFormHandler(e){
      this.setState({[e.target.name]:e.target.value});
    }

    render(){
      console.log(this.props.data);
      return(
        <article>
          <h2>Update</h2>
          <form action="/update_process" method = "post"
            onSubmit = {function(e){
              e.preventDefault();
              this.props.onSubmit(
                 this.state.id,
                 this.state.title,
                 this.state.desc 
              ); 
            }.bind(this)}
          
          
          >


            <input type="hidden" name="id" value={this.state.id}></input>
            <p><input 
              type="text" 
              name="title" 
              value={this.state.title} 
              placeholder="title"
              onChange = {this.inputFormHandler}
              //onChange = {function(e){
              //  this.setState({title:e.target.value});
              //}.bind(this)}

              ></input></p>

            
            <p><textarea 
              name="desc" 
              value={this.state.desc} 
              placeholder="description" 
              onChange = {this.inputFormHandler} 
              ></textarea></p>
            
            <p><input type="submit"></input></p>
          </form>
        </article>

      );
    }
  }

  export default UpdateContent;