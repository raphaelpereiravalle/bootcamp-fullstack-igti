import React, { Component } from 'react'
import { formatPercentage } from '../../helpers/formatters';

export default class InputReadOnly extends Component {
    render() {
        const { label, value, color, percentage } = this.props;

        let percentageFormat = percentage > 0 ? formatPercentage(percentage) : '';

        return (
            <div className="input-field col s3">
                <input
                    id={label} 
                    type="text"
                    style={{ fontWeight: "bold", color }}
                    value={`${value} ${(percentageFormat)}`}
                    disabled
                />
                <label className="active" htmlFor={label}>
                    {label}
                </label>
            </div>
        );
    }
}
