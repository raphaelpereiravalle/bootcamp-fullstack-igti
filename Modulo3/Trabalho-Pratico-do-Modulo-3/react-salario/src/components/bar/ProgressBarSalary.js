import React, { Component } from 'react'

export default class ProgressBarSalary extends Component {
    render() {
        const {      
            colorINSS, 
            percentINSS,
            colorIRPF,
            percentIRPF,
            colorNetSalary,
            percentNetSalary,
            height = '20px',
        } = this.props;

        return (
            <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}> 
                <div style = {{ 
                        backgroundColor: colorINSS,
                        width: percentINSS + '%',
                        height: height,
                    }}>
                </div>
                <div style = {{
                        backgroundColor: colorIRPF,
                        width: percentIRPF + '%',
                        height: height,
                    }}>
                </div>
                <div style = {{
                        backgroundColor: colorNetSalary,
                        width: percentNetSalary + '%',
                        height: height,
                    }}>
                </div>
            </div>
        );
    }
}
