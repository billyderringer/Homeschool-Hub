import React, { Component } from 'react'

class Selector extends Component{
    render(){
        return(
            <select name={this.props.name} >
                {
                    this.props.options.map((option, i) => {
                        return <option value={option.termTitle}>
                            {option.name}
                        </option>
                    })
                }
            </select>
        )
    }
}

export default Selector