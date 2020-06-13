import * as React from "react";
import * as ButtonDefinitions from "./buttondefines"


export interface calculator_buttonProps {value: number, handleClick: any, buttonClass: string}

export class Calculator_button extends React.Component<calculator_buttonProps, {}>{
    checkForSingleDigit(digit: number): string{
        let output: string;
        switch (digit){
            case ButtonDefinitions.NUMBER_BUTTON_DECIMAL_POINT:{
                output = ".";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_PLUS:{
                output = "+";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_MINUS:{
                output = "-";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_DIVIDE:{
                output = "/";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_MULTIPLY:{
                output = "*";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_EQUALS:{
                output = "=";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_CLEAR:{
                output = "C";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_PERCENT:{
                output = "%";
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_INVERT:{
                output = "-/+";
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
                        className={this.props.buttonClass} 
                        value={this.checkForSingleDigit(this.props.value)} 
                        onClick={() => this.clickHandler(this.props.value)} />
    }
    clickHandler(test: number){
        this.props.handleClick(test);
    }
}