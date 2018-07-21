import React, { Component } from 'react'
import './Term.css'
import Modal from 'react-modal'

class Term extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.addTerm = this.addTerm.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({
            value: ''
        })
    }

    handleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    addTerm(){

    }


    render(){
        return(
            <div id="container-term">
                    <h4 className="menu-title">Terms</h4>
                    <i className="fas fa-plus-square menu-icon"
                       onClick={this.handleModal} />

                <Modal isOpen={this.state.isModalOpen}
                       onRequestClose={this.closeModal}
                       ariaHideApp={false}
                       contentLabel="Sign In Modal"
                       style={this.props.styles.modal}>
                    <div className="container-modal center-all-flex">
                        <div className="modal-header">
                            <h2 className="modal-title">Add Term</h2>
                            <img src={require("../../../../../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                                 alt="homeschool hub logo"
                                 className="modal-logo"/>
                        </div>
                        <form  className="center-all-flex"
                               onSubmit={this.handleSubmit}>
                            <input type="text"
                                   placeholder="Term Title"
                                   name="termTitle"
                                   onChange={this.handleChange}/>
                            <input type="date"
                                   placeholder="Term Start"
                                   name="termStart"
                                   onChange={this.handleChange}/>
                            <input type="date"
                                   placeholder="Term End"
                                   name="termEnd"
                                   onChange={this.handleChange}/>
                            <div className="button-row">
                                <button type="submit"
                                        className="green-button"
                                        style={{marginLeft: '0'}}
                                >Add
                                </button>
                                <button type="button"
                                        onClick={this.handleModal}
                                        className="green-button"
                                >Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Term