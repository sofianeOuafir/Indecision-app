console.log('App.js is running');

const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if(option){
    app.options.push(option);
    e.target.elements.option.value = '';
    renderApp();
  }
};

const onRemoveAll = (e) => {
  e.preventDefault();
  app.options = [];
  renderApp();
}

const onMakeDecision = (e) => {
  e.preventDefault();
  const randomNumber = Math.floor(Math.random() * 10) % app.options.length;
  alert(app.options[randomNumber]);
};

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1> 
      {app.subtitle && <p>{app.subtitle}</p>}
  
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options to show'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button disabled={app.options.length === 0} onClick={onRemoveAll}>Remove All</button>
      <ol>
        {
          app.options.map((option, index) => <li key={index}>{option}</li>)
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" autoComplete={'off'}/>
        <button>Add Option</button>
      </form>
    </div>
  );
  ReactDOM.render(template, appRoot);
};

renderApp();
