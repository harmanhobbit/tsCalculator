import * as React from "react";
import { any } from "prop-types";

export interface calculator_buttonProps {value: number, handleClick: any}

export class Calculator_button extends React.Component<calculator_buttonProps, {}>{
    checkForSingleDigit(digit: number): string{
        let output: string;
        switch (digit){
            case 10:{
                output = ".";
                break;
            }

            case 11:{
                output = "+";
                break;
            }

            case 12:{
                output = "-";
                break;
            }

            case 13:{
                output = "/";
                break;
            }

            case 14:{
                output = "*";
                break;
            }

            default: {
                output = digit.toString();
                break;
            }
        }
        return output;
    }

    render(){
        return <input   type="button" 
                        className="button_style" 
                        value={this.checkForSingleDigit(this.props.value)} 
                        onClick={() => this.clickHandler(this.props.value)} />
    }
    clickHandler(test: number){
        this.props.handleClick(test);
    }
}