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
      currPoint: '',
      lastMov: '',
      movies: [],
      lists: [],
      listChoice: '',
      displayButton: 'none',
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
              if(entry === idVal) {
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
        let relRef = firebase.database().ref('relations');
        relRef.on('value', snapshot => {
          let rels = snapshot.val();
            for (let entry in rels) {
              if(rels[entry].mov === idVal) {
                let pos = otherLists.indexOf(rels[entry].list);
                otherLists.splice(pos, 1);
              }
            }
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
        });
    });

    var listDiv = document.createElement('div');
    var listBtn = document.createElement('button');
    listBtn.id = 'list-btn';
    listBtn.innerHTML = 'Add to List';
    listDiv.appendChild(addList);
    listDiv.appendChild(listBtn);
    listBtn.onclick = function () {
      var choice = document.getElementById('add-list').value;
      if(choice.length === 0) {
        alert('No list selected.');
      } else {
        let formObj = {
          mov: idVal, 
          list: choice,
        };
        firebase.database().ref('relations').push().set(formObj);
        alert('Successfully added '+title+' to '+choice+' list.');
      }
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

  componentWillUnmount() {
    this.ref.off();
    this.listRef.off();
  }

  componentDidMount(){
    document.title = 'Great Movies';
    console.log('hi');
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    this.ref = firebase.database().ref('movies');
    this.ref.on('value', snapshot => {
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
        }
        this.setState({lastMov: newData[newData.length-1]});
        if(newData.length < 9) {
          //document.getElementById('pag-container').style.display = 'none';
          this.setState({displayButton: 'none'});
        } else {
          //document.getElementById('pag-container').style.display = 'block';
          this.setState({displayButton: 'block'});
        }
        //this.setState({movies: newData});
    });

    // PAGINATION
    let first = this.ref.orderByKey().limitToFirst(9);
    first.on('value', snapshot => {
      let firstMovs = snapshot.val();
      let currEight = [];
      for (let entry in firstMovs) {
        currEight.push({
          id:  entry,
          name:  firstMovs[entry].name,
          src:  firstMovs[entry].src,
          director:  firstMovs[entry].director,
          imdb:  firstMovs[entry].imdb,
          plot:  firstMovs[entry].plot,
        });
      }
      this.setState({currPoint: currEight[currEight.length-1].id});
      currEight.pop();
      this.setState({movies: currEight});
      console.log('didmount update');
      console.log(this.state.movies);
    });

    this.listRef = firebase.database().ref('lists');
    this.listRef.on('value', snapshot => {
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
      /*let ref = firebase.database().ref('movies');
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
          }
          this.setState({movies: newData});
      })*/
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
          }
          this.setState({lastMov: newData[newData.length-1]});
          if(newData.length < 9) {
            //document.getElementById('pag-container').style.display = 'none';
            this.setState({displayButton: 'none'});
          } else {
            //document.getElementById('pag-container').style.display = 'block';
            this.setState({displayButton: 'block'});
          }
          //this.setState({movies: newData});
      });
      console.log("IN HEREEEEEEE");
      // PAGINATION
      let first = ref.orderByKey().limitToFirst(9);
      first.on('value', snapshot => {
        let firstMovs = snapshot.val();
        let currEight = [];
        for (let entry in firstMovs) {
          currEight.push({
            id:  entry,
            name:  firstMovs[entry].name,
            src:  firstMovs[entry].src,
            director:  firstMovs[entry].director,
            imdb:  firstMovs[entry].imdb,
            plot:  firstMovs[entry].plot,
          });
        }
        this.setState({currPoint: currEight[currEight.length-1].id});
        currEight.pop();
        this.setState({movies: currEight});
        //console.log(this.state.currPoint);
        console.log('didupdate update');
        console.log(this.state.movies);
      });
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

  getMoreMovies() {
    let ref = firebase.database().ref('movies');
    let tmp = ref.orderByKey().startAt(this.state.currPoint);
    let next = tmp.limitToFirst(9);
    next.on('value', snapshot => {
      let nextMovs = snapshot.val();
      let currEight = [];
      for (let entry in nextMovs) {
        currEight.push({
          id:  entry,
          name:  nextMovs[entry].name,
          src:  nextMovs[entry].src,
          director:  nextMovs[entry].director,
          imdb:  nextMovs[entry].imdb,
          plot:  nextMovs[entry].plot,
        });
      }
      // If last batch 
      if(currEight[currEight.length-1].id === this.state.lastMov.id && currEight.length <= 8) {
        this.setState({displayButton: 'none'});
      } else {
        this.setState({currPoint: currEight[currEight.length-1].id});
        currEight.pop();
      }
      /*if(currEight[currEight.length-1].id !== this.state.lastMov.id && currEight.length%8 !== 0) {
        this.setState({currPoint: currEight[currEight.length-1].id});
        currEight.pop();
        console.log('not end');
        console.log(currEight);
      } else {
        this.setState({displayButton: 'none'});
      }*/
      /*if(currEight.length < 8) {
        this.setState({displayButton: 'none'});
      }*/
      let totalMovies = this.state.movies;
      totalMovies = totalMovies.concat(currEight);
      this.setState({movies: totalMovies});
      console.log('getMore update');
      console.log(this.state.movies);
    });
  }

  myChangeHandler = (event) => {
    let field = event.target.name;
    let value = event.target.value;
    this.setState({[field]: value});
    
    let listChoice = document.getElementById('list').value;
    if(listChoice === 'all') {
      /*let ref = firebase.database().ref('movies');
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
      })*/
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
          }
          this.setState({lastMov: newData[newData.length-1]});
          if(newData.length < 9) {
            //document.getElementById('pag-container').style.display = 'none';
            this.setState({displayButton: 'none'});
          } else {
            //document.getElementById('pag-container').style.display = 'block';
            this.setState({displayButton: 'block'});
          }
          //this.setState({movies: newData});
      });

      // PAGINATION
      let first = ref.orderByKey().limitToFirst(9);
      first.on('value', snapshot => {
        let firstMovs = snapshot.val();
        let currEight = [];
        for (let entry in firstMovs) {
          currEight.push({
            id:  entry,
            name:  firstMovs[entry].name,
            src:  firstMovs[entry].src,
            director:  firstMovs[entry].director,
            imdb:  firstMovs[entry].imdb,
            plot:  firstMovs[entry].plot,
          });
        }
        this.setState({currPoint: currEight[currEight.length-1].id});
        currEight.pop();
        console.log(currEight);
        this.setState({movies: currEight});
        //console.log(this.state.currPoint);
        console.log('all change handler update');
        console.log(this.state.movies);
      });
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
          let movsRef = firebase.database().ref('movies');
          movsRef.on('value', snapshot => {
            let movies = snapshot.val();
              let newData = [];
              for (let entry in movies) {
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
              if(newData.length < 9) {
                //document.getElementById('pag-container').style.display = 'none';
                this.setState({displayButton: 'none'});
              } else {
                //document.getElementById('pag-container').style.display = 'block';
                this.setState({displayButton: 'block'});
              }
              this.setState({movies: newData});
              console.log('list update');
              console.log(this.state.movies);
          })
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
        if(newData.length < 9) {
          //document.getElementById('pag-container').style.display = 'none';
          this.setState({displayButton: 'none'});
        } else {
          //document.getElementById('pag-container').style.display = 'block';
          this.setState({displayButton: 'block'});
        }
        this.setState({movies: newData});
        console.log('search update');
        console.log(this.state.movies);
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
          <div id='pag-container' style={{display: this.state.displayButton}}>
            <button id='pagination' onClick={this.getMoreMovies.bind(this)}>Load More</button>
          </div>
        </div>
        <button className='scrollButton' style={{display: this.props.display}} onClick={this.props.scrollToTop}>Scroll to Top</button>
      </div>
    );
  }
}
export default Movies;