import React, { Component } from 'react'

export default class InputFullSalary extends Component {
    handleInputChange = (event) => {
        this.props.onChange(event.target.value);
    }
    render() {
        const { label, value } = this.props
        return (
            <div className="input-field col s12">
                <input
                   // id="salary"
                    type="number"
                    min="1000"
                    step="100"
                    value={value}
                    onChange={this.handleInputChange}
                    //disabled={}
                 />
                 <label className="active" /* htmlFor={id} */>{label}</label>
            </div>
        )
    }
}
