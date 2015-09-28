/*global io*/ 
var React = require('react'); 
var PageHeader = require('./pageHeader'); 
var PostList = require('./postList'); 

var App = React.createClass({
    
    getInitialState: function(){
        return {
            counter: 0, 
	        posts: [{provider: 'twitter', content: 'hello from twitter'}]        
		};
	}, 
	
	componentDidMount: function(){
        var self = this;
        var socket = io.connect(this.props.settings.host);
    
        socket.on('post', function (data) {
            self.addPost(data);
        });
    
    }, 
    
    addPost: function(post){
        console.log(post);
        this.setState({
            posts:  [post].concat(this.state.posts)
        });  
    }, 
    
    render: function() {
        return (
            <div>
            {this.state.posts.length}
            <PageHeader title={this.props.title}/>
            <PostList posts={this.state.posts}/>
            </div>
        );
    }
}); 

module.exports = App; 