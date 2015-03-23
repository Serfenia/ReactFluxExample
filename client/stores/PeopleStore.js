import Flux from 'flux-react';

/** Dispatcher */
var PeopleStore = Flux.createStore({
  people: [{
    id: '1',
    name: 'Patrick van Vuuren'
  },{
    id: '2',
    name: 'Robin ter Horst'
  },{
    id: '3',
    name: 'Rosanna de Weert'
  }],
  exports: {
    getPeople: function () {
      return this.people;
    }
  }
});

export default PeopleStore;