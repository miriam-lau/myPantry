import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import HomeContainer from './home_container';
import Carousel from 'nuka-carousel';
import Decorator from './decorator';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'guest', password: 'password'};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    return this.props.receiveCurrentUser({user})
      .then( () => { this.props.history.push('/pantry_items');
    });
  }

  render() {
    return (
      <div className="main-content">
        <Carousel className="image" wrapAround={true} autoplay={true}
          autoInterval={5000} decorators={Decorator}>

          <div className="home-panels">
            <h2 className="home-titles1">myPantry</h2>
            <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1079&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Keep Track of Your Pantry</h2>
            <img src="https://images.unsplash.com/photo-1492739159057-7d1896b3c63f?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=844&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Make Grocery Lists</h2>
            <img src="https://images.unsplash.com/photo-1482012792084-a0c3725f289f?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
             alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Save Recipes</h2>
            <img src="https://images.unsplash.com/photo-1491994778642-b286df793bf6?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>
        </Carousel>

        <div>
          <section className="app-info">
            <section>
              <h3>Keep Track of Your Pantry</h3>
              <p>Always know what you have in your pantry.  Check out the auto-update feature: after purchasing groceries, click a button and myPantry will combine duplicate items and add new items to your pantry from your Grocery page.</p>
            </section>
            <section>
              <h3>Make Grocery Lists</h3>
              <p>Grocery Shopping has never been easier! Add items to your grocery list. Check off items to transfer them to the "Purchased" list. Click a button to add purchased items to your pantry.</p>
            </section>
            <section>
              <h3>Save Recipes</h3>
              <p>Save your favorite recipes in myPantry.  Create and view your recipes in the Recipe page. Add personal notes, upload food photos, and rate your recipes.</p>
              </section>
          </section>
        </div>

       <div id="footer">
         <footer className="home-footer">
           <div>Copyright 2017 myPantry. All rights reserved.
           </div>
         </footer>
       </div>

      </div>
    )
  }
}

export default Home;


// <button className="guest-sign-in" onClick={ this.handleSubmit }>Guest Sign In</button>
