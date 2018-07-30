import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Term.css'
import Modal from 'react-modal'
import GenericApi from '../../../../../Data/API/generic'
import Selector from "../../../../Selector"

const genericApi = new GenericApi()

class Term extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            termTitle: '',
            termStart: '',
            termEnd: ''
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
        this.addTerm()
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

        const body = {
            "termTitle": this.state.termTitle,
            "termStart": this.state.termStart,
            "termEnd": this.state.termEnd
        }

        genericApi.addElement(body, "term", localStorage.getItem('teacherId'))
        this.setState({isModalOpen: !this.state.isModalOpen})
    }


    render(){
        return(
            <section id="container-term"
                 className="container-menu">

                <section id="term-header">
                    <h4 className="menu-title">Terms</h4>
                    <i className="fas fa-plus-square menu-icon"
                       onClick={this.handleModal} />
                </section>

                <Selector name="Terms" options={this.props.teacher.terms}/>

                <Modal isOpen={this.state.isModalOpen}
                       onRequestClose={this.closeModal}
                       ariaHideApp={false}
                       contentLabel="Sign In Modal"
                       style={this.props.styles.modal}>
                    <section className="container-modal">
                        <section className="modal-header">
                            <h2 className="modal-title">Add Term</h2>
                            <img src={require("../../../../../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                                 alt="homeschool hub logo"
                                 className="modal-logo"/>
                        </section>
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
                            <section className="button-row">
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
                            </section>
                        </form>
                    </section>
                </Modal>
            </section>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        styles: state.styleReducer,
        teacher: state.teacherReducer.currentTeacher
    }
}

export default connect(mapStateToProps)(Term)