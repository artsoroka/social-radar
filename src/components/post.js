var React = require('react'); 

var Post = React.createClass({
    render: function() {
        return (
            <li><b>{this.props.provider}</b> {this.props.content}</li>
        );
    }
}); 

module.exports = Post; 