import * as React from "react"

export interface Number_padProps {}

import { Calculator_button } from "./calculator_button";
import { Number_Readout } from "./number_readout";
import * as ButtonDefinitions from "./buttondefines";

var onScreenReadout: number = 0.0;
var memory: number = 0.0;
var operator: number = ButtonDefinitions.NUMBER_BUTTON_PLUS;
var decimalTracker: number = 0;

let buttonLayout = [
    {col: ButtonDefinitions.NUMBER_BUTTON_CLEAR, colClass: "operator_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_INVERT, colClass: "operator_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_PERCENT, colClass: "operator_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_DIVIDE, colClass: "operator_style"},
    {col: 7, colClass: "button_style"},
    {col: 8, colClass: "button_style"},
    {col: 9, colClass: "button_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_MULTIPLY, colClass: "operator_style"},
    {col: 4, colClass: "button_style"},
    {col: 5, colClass: "button_style"},
    {col: 6, colClass: "button_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_MINUS, colClass: "operator_style"},
    {col: 1, colClass: "button_style"},
    {col: 2, colClass: "button_style"},
    {col: 3, colClass: "button_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_PLUS, colClass: "operator_style"},
    {col: 0, colClass: "button_style pad-0"},
    {col: {}, colClass: "hide"},
    {col: ButtonDefinitions.NUMBER_BUTTON_DECIMAL_POINT, colClass: "button_style"},
    {col: ButtonDefinitions.NUMBER_BUTTON_EQUALS, colClass: "operator_style"},
]

export class Number_pad extends React.Component<Number_padProps, {ReadoutNumber: number}>{
    constructor(props: any){
        super(props);
        this.state = {ReadoutNumber: onScreenReadout}
    }

/*    generateButtons(){
        return buttonLayout.map((button: {
            col1: number;
            col1Class: string;
            col2: number;
            col2Class: string;
            col3: number;
            col3Class: string;
            col4: number;
            col4Class: string}) => 
            <div className="pad-row">
                <Calculator_button 
                    value={button.col1} 
                    handleClick={() => this.clickHandler(button.col1)} 
                    buttonClass={button.col1Class} />
                <Calculator_button 
                    value={button.col2} 
                    handleClick={() => this.clickHandler(button.col2)}
                    buttonClass={button.col1Class} />
                <Calculator_button 
                    value={button.col3} 
                    handleClick={() => this.clickHandler(button.col3)}
                    buttonClass={button.col3Class} />
                <Calculator_button 
                    value={button.col4} 
                    handleClick={() => this.clickHandler(button.col4)}
                    buttonClass={button.col4Class} />
            </div>)
    }
*/
    buttonOperator(operatorDigit: number, number1: number, number2: number): number{
        let answer: number = 0;

        if(operator === ButtonDefinitions.NUMBER_BUTTON_EQUALS){
            answer = number2;
        }
        else{
            switch(operatorDigit){
                case ButtonDefinitions.NUMBER_BUTTON_PLUS:{
                    answer = number1 + number2;
                    break;
                }

                case ButtonDefinitions.NUMBER_BUTTON_MINUS:{
                    answer = number1 - number2;
                    break;
                }

                case ButtonDefinitions.NUMBER_BUTTON_MULTIPLY:{
                    answer = number1 * number2;
                    break;
                }

                case ButtonDefinitions.NUMBER_BUTTON_DIVIDE:{
                    answer = number1 / number2;
                    break;
                }

                case ButtonDefinitions.NUMBER_BUTTON_PERCENT:{
                    answer = number2 / number1 * 100;
                    break;
                }

                case ButtonDefinitions.NUMBER_BUTTON_EQUALS:{
                    answer = number1;
                    break;
                }

                default:{
                    answer = 999;
                    break;
                }
            }
        }
        decimalTracker = 0;
        return answer;
    }

    addDigit(digit: number): number {
        switch(digit){
            case ButtonDefinitions.NUMBER_BUTTON_CLEAR:{
                onScreenReadout = 0;
                memory = 0;
                operator = ButtonDefinitions.NUMBER_BUTTON_PLUS;
                decimalTracker = 0;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_PLUS:{
                    memory = this.buttonOperator(operator,
                                                memory,
                                                onScreenReadout);
                    onScreenReadout = 0;
                operator = ButtonDefinitions.NUMBER_BUTTON_PLUS;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_MINUS:{
                memory = this.buttonOperator(operator,
                                            memory,
                                            onScreenReadout);
                    onScreenReadout = 0;
                    operator = ButtonDefinitions.NUMBER_BUTTON_MINUS;
                    break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_MULTIPLY:{
                memory = this.buttonOperator(operator,
                                            memory,
                                            onScreenReadout);
                onScreenReadout = 0;
                operator = ButtonDefinitions.NUMBER_BUTTON_MULTIPLY;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_DIVIDE:{
                memory = this.buttonOperator(operator,
                                            memory,
                                            onScreenReadout);
                onScreenReadout = 0;
                operator = ButtonDefinitions.NUMBER_BUTTON_DIVIDE;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_PERCENT:{
                memory = this.buttonOperator(operator,
                                            memory,
                                            onScreenReadout);
                onScreenReadout = 0;
                operator = ButtonDefinitions.NUMBER_BUTTON_PERCENT;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_EQUALS:{
                onScreenReadout = this.buttonOperator(operator, memory, onScreenReadout);
                operator = ButtonDefinitions.NUMBER_BUTTON_EQUALS;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_INVERT:{
                onScreenReadout = -onScreenReadout;
                break;
            }

            case ButtonDefinitions.NUMBER_BUTTON_DECIMAL_POINT:{
                if(!decimalTracker) ++decimalTracker;
                break;
            }

            default:{
                /*if(!decimalTracker){
                    onScreenReadout = onScreenReadout * 10 + digit;
                }
                else{
                    onScreenReadout = (onScreenReadout * Math.pow(10, decimalTracker) + digit)
                    ++decimalTracker;
                    onScreenReadout = onScreenReadout / Math.pow(10, decimalTracker);
                }*/
                
                if(decimalTracker){
                    onScreenReadout = ((onScreenReadout * Math.pow(10, decimalTracker)) + digit)
                    onScreenReadout = onScreenReadout / Math.pow(10, decimalTracker);
                    ++decimalTracker;
                } 
                else{
                    onScreenReadout = onScreenReadout * 10 + digit;
                }
                
                break;
            }
        }
        return onScreenReadout;
    }

    clickHandler(test: number){
        //alert("Sum: " + this.addDigit(test));
        this.setState( state => ({ReadoutNumber: this.addDigit(test)}));
    }

    render(){
        return <div className="pad-wrapper">
            <Number_Readout readoutNumber={this.state.ReadoutNumber} />
            {buttonLayout.map((button: {
                col: number;
                colClass: string;}) => 
                    <Calculator_button  value={button.col} 
                                        handleClick={() => this.clickHandler(button.col)} 
                                        buttonClass={button.colClass} />
            )}
        </div>
    }
}