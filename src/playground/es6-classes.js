class Person {
  constructor (name, age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    return `Hello, I am ${this.name}.`;
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old`;
  }
}

class Student extends Person{
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  getDescription() {
    let description = super.getDescription();
    if(this.hasMajor()){
      description += ` and is studying ${this.major}`;
    }
    return description;
  }

  hasMajor() {
    return !!this.major;
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation){
    super(name, age);
    this.homeLocation = homeLocation;
  }

  getGreeting(){
    let greeting = super.getGreeting();
    if(this.hasHomeLocation()){
      greeting += ` I'm visiting from ${this.homeLocation}`;
    }
    return greeting;
  }

  hasHomeLocation(){
    return !!this.homeLocation;
  }
}

const me = new Traveler('Sofiane Ouafir', 24, 'Cannes');
const alex = new Student('Alex', 24);
console.log(me.getGreeting());
console.log(alex.getGreeting());
