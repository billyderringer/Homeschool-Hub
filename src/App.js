import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './Store/'
import Header from './Components/Header'
import Body from './Components/Body'
import Footer from './Components/Footer'

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <div className="container-main">
                <Header />
                <Body />
                <Footer />
            </div>
        </Provider>
    )
  }
}

export default App
