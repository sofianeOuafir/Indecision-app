import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  }

  handleDeleteOption = (option) => {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((element) => element !== option)
      }
    });
  };

  handlePick = () => {
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNumber];
    this.setState(() => ({ 
      selectedOption: option }));
  };

  handleAddOption = (option) => {
    if (!option){
      return 'Enter a valid value to add item.';
    } else if(this.state.options.includes(option)){
      return 'The item already exists.';
    }

    this.setState((prevState) => ({options: prevState.options.concat([option])}));
  };

  handleDeleteOptions = () => {
    this.setState(() => ({options: []}));
  };

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

  render () {
    const subtitle = "Put your life in the hands of a computer.";

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action 
            hasOptions={this.state.options.length > 0} 
            handlePick={this.handlePick} 
          />
          <div className="widget">
            <Options 
              options={this.state.options} 
              handleDeleteOptions={this.handleDeleteOptions} 
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal 
          handleClearSelectedOption={this.handleClearSelectedOption}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
}