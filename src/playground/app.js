const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision App'
}

const Action = (props) => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>What should I do?</button>
    </div>
  );
  
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove all options</button>
      {props.options.length === 0 && <p>Please add an option to get started!</p>}
      {
        props.options.map((option, index) => {
         return <Option key={index} 
                        option={option} 
                        handleDeleteOption={ props.handleDeleteOption } />
        })
      }
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.option}
      <button onClick={() => { props.handleDeleteOption(props.option) }}>Remove</button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor (props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));

    if(!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" autoComplete={'off'}/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  handleDeleteOptions () {
    this.setState(() => ({options: []}));
  }

  componentDidMount () {
    try{
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if(options) {
        this.setState(() => ({ options }))
      }
    } catch (e) {

    }
  }

  componentDidUpdate (prevProps, prevState) {
    if(prevState.options.length !== this.state.options.length) {
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }

  componentWillUnmount () {
    console.log('unmount');
  }

  handleDeleteOption (option) {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((element) => element !== option)
      }
    });
  }

  handlePick() {
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomNumber]);
  }

  handleAddOption (option) {
    if (!option){
      return 'Enter a valid value to add item';
    } else if(this.state.options.includes(option)){
      return 'Option already exist';
    }

    this.setState((prevState) => ({options: prevState.options.concat([option])}));
  }

  render () {
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick} 
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions} 
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'))