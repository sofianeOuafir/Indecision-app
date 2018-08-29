class VisibilityToggle extends React.Component {
  constructor (props){
    super(props);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {
      visible: false
    };
  }

  toggleVisibility () {
    this.setState((prevState) => {
      return {
        visible: !prevState.visible
      };
    });
  }

  render (){
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.toggleVisibility}>{this.state.visible ? 'Hide details' : 'Show details'}</button>
        {this.state.visible && <p>Hey, these are some details you can see now!</p>}
      </div>
    );
  }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

// let display = false;

// const onButtonClick = () => {
//   display = !display;
//   renderApp();
// }

// const rootApp = document.getElementById('app');

// const renderApp = () => {
//   const template = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={onButtonClick}>{display ? 'Hide details' : 'Show details'}</button>
//       {display && <p>Hey, these are some details you can see now!</p>}
//     </div>
//   );

//   ReactDOM.render(template, rootApp);
// };

// renderApp();