var React = require('react'); 
var Post     = require('./post'); 

var PostList = React.createClass({

    render: function() {
        
        var content = this.props.posts.map(function(post){
            return (
                <Post provider={post.provider} content={post.content}/>
            ); 
        });
        
        return (
            <ul>{content}</ul>
        );
    }
}); 

module.exports = PostList; 