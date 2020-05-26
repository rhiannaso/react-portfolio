import React, { Component } from 'react';
import MovieGallery from './MovieGallery';
import config from '../config.js';
//const movies = require('../movies.json');
const firebase = require('firebase');

/*
  3. Pagination
    - first only display 8
    - display more by 8 (or less than 8 if not a multiple of 8)
*/

export class Movies extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: [],
      lists: [],
      listChoice: '',
      shouldUpdate: false,
    }
  }

  enlarge(imgSrc, title, director, rating, plot, idVal) {
    document.body.style.overflow = 'hidden';
    var lbContent = document.createElement('img');
    lbContent.className = 'movLightbox-content';
    lbContent.src = imgSrc;
    lbContent.id = 'lbContent';

    var lbInfo = document.createElement('div');
    lbInfo.className = 'movLightbox-info';
    lbInfo.id = 'lbInfo';
    lbInfo.innerHTML = '<span class=\'title\'>'+title+'</span><br/><span class=\'director\'>'+director+'</span><br/><br/><span class=\'rating\'>IMDb Rating: '+rating+'</span><p>'+plot+'</p>';
    
    var lbMovie = document.createElement('div');
    lbMovie.id = 'lbMovie';
    lbMovie.className = 'movLightbox-container';
    
    var lightbox = document.createElement('div');
    lightbox.id = 'lb';
    lightbox.className = 'movLightbox';

    var delButton = document.createElement('button');
    delButton.id = 'delButton';
    delButton.innerHTML = 'Delete Movie';
    delButton.onclick = function () {
      // Is there a way to do it without being inline?
      if(window.confirm('Are you sure you want to delete '+title+'?')) {
        let ref = firebase.database().ref('movies');
        ref.on('value', snapshot => {
          let movies = snapshot.val();
            for (let entry in movies) {
              if(movies[entry].id === idVal) {
                firebase.database().ref('movies/'+entry).remove();
              }
            }
        })

        let refList = firebase.database().ref('relations');
        refList.on('value', snapshot => {
          let relations = snapshot.val();
            for (let entry in relations) {
              if(relations[entry].mov === idVal) {
                firebase.database().ref('relations/'+entry).remove();
              }
            }
        })

        // Close lightbox
        document.getElementById('lb').removeChild(document.getElementById('lbMovie'));
        document.body.removeChild(document.getElementById('lb'));
        document.body.style.overflow = 'auto';
      }
    };

    var addList = document.createElement('select');
    addList.id = 'add-list';
    addList.style.marginTop = '10px';
    addList.name = 'addLists';
    let listRef = firebase.database().ref('lists');
    let otherLists = [];
    listRef.on('value', snapshot => {
      let lists = snapshot.val();
        for (let entry in lists) {
          otherLists.push(lists[entry].name);
        }
    });

    let relRef = firebase.database().ref('relations');
    relRef.on('value', snapshot => {
      let rels = snapshot.val();
        for (let entry in rels) {
          if(rels[entry].mov === idVal) {
            let pos = otherLists.indexOf(rels[entry].list);
            otherLists.splice(pos, 1);
          }
        }
    });

    var opt = document.createElement('option');
    opt.value = '';
    opt.innerHTML = 'Select List';
    opt.disabled = 'true';
    opt.selected = 'true';
    opt.hidden = 'true';
    addList.appendChild(opt);
    for(var i in otherLists) {
      opt = document.createElement('option');
      opt.value= otherLists[i];
      opt.innerHTML = otherLists[i]; 
      addList.appendChild(opt);
    }

    var listDiv = document.createElement('div');
    var listBtn = document.createElement('button');
    listBtn.id = 'list-btn';
    listBtn.innerHTML = 'Add to List';
    listDiv.appendChild(addList);
    listDiv.appendChild(listBtn);
    listBtn.onclick = function () {
      var choice = document.getElementById('add-list').value;
      
      let formObj = {
        mov: idVal, 
        list: choice,
      };
      firebase.database().ref('relations').push().set(formObj);
      alert('Successfully added '+title+' to '+choice+' list.');
    };
   
    document.body.appendChild(lightbox);  
    document.getElementById('lb').appendChild(lbMovie);
    document.getElementById('lbMovie').appendChild(lbContent);
    document.getElementById('lbMovie').appendChild(lbInfo);
    document.getElementById('lbInfo').appendChild(listDiv);
    document.getElementById('lbInfo').appendChild(delButton);
    document.getElementById('lb').addEventListener('click', function(event) {
      if(event.target.className === 'movLightbox') {
        document.getElementById('lb').removeChild(document.getElementById('lbMovie'));
        document.body.removeChild(document.getElementById('lb'));
        document.body.style.overflow = 'auto';
      }
    });
  }

  componentDidMount(){
    document.title = 'Great Movies';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    let ref = firebase.database().ref('movies');
    ref.on('value', snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          newData.push({
            id:  entry,
            name:  movies[entry].name,
            src:  movies[entry].src,
            director:  movies[entry].director,
            imdb:  movies[entry].imdb,
            plot:  movies[entry].plot,
          })
          /*newData.push(
            movies[entry].id
          )*/
        }
        this.setState({movies: newData});
    })
    let listRef = firebase.database().ref('lists');
    listRef.on('value', snapshot => {
      let lists = snapshot.val();
        let newData = [];
        for (let entry in lists) {
          newData.push(
            lists[entry].name
          )
        }
        this.setState({lists: newData});
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      let ref = firebase.database().ref('movies');
      ref.on('value', snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              director:  movies[entry].director,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
            })
            /*newData.push(
              movies[entry].id,
            )*/
          }
          this.setState({movies: newData});
      })
      let listRef = firebase.database().ref('lists');
      listRef.on('value', snapshot => {
        let lists = snapshot.val();
          let newData = [];
          for (let entry in lists) {
            newData.push(
              lists[entry].name
            )
          }
          this.setState({lists: newData});
      })
    }
  }

  myChangeHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
    
    let listChoice = document.getElementById('list').value;
    if(listChoice === 'all') {
      let ref = firebase.database().ref('movies');
      ref.on('value', snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              director:  movies[entry].director,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
            })
            //newData.push(movies[entry].id);
          }
          this.setState({movies: newData});
      })
    } else {
      let movsInList = [];
      let ref = firebase.database().ref('relations');
      ref.on('value', snapshot => {
        let rels = snapshot.val();
          //let newData = [];
          for (let entry in rels) {
            if(rels[entry].list === listChoice) {
              //newData.push(rels[entry].mov);
              movsInList.push(rels[entry].mov);
            }
          }
          //this.setState({movies: newData});
      })
      let movsRef = firebase.database().ref('movies');
      movsRef.on('value', snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
              //newData.push(rels[entry].mov);
            if (movsInList.includes(entry)) {
              newData.push({
                id:  entry,
                name:  movies[entry].name,
                src:  movies[entry].src,
                director:  movies[entry].director,
                imdb:  movies[entry].imdb,
                plot:  movies[entry].plot,
              })
            }
          }
          this.setState({movies: newData});
      })
    }
  }

  searchMovies() {
    let movChoice = document.getElementById('search').value.toLowerCase();

    let ref = firebase.database().ref('movies');
    ref.on('value', snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          let title = (movies[entry].name).toLowerCase();
          if (title.includes(movChoice)) {
            //newData.push(movies[entry].id);
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              director:  movies[entry].director,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
            })
          }
        }
        this.setState({movies: newData});
    })
  }
  
  render() {
    return (
      <div>
        <div className='content'>
          <div id='top-bar'>
            <div id='list-container'>
              <select name='listChoice' id='list' onChange={this.myChangeHandler}>
                <option value='all'>All</option>
                {
                  this.state.lists.map((list) => (
                    <option value={list}>{list}</option>
                  ))
                }
              </select>
            </div>
            <div id='search-bar'>
              <input type='text' placeholder='Movie Title' name='search' id='search' />
              <button id='search-btn' onClick={this.searchMovies.bind(this)}>Search</button>
            </div>
          </div>
          <div className='mov-container'>
            <MovieGallery movieList={this.state.movies} enlarge={this.enlarge} />
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Movies;