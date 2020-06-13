import * as React from "react"

export interface Number_padProps {}

import { Calculator_button } from "./calculator_button";
import { Number_Readout } from "./number_readout"
import * as ButtonDefinitions from "./buttondefines"

var onScreenReadout: number = 0.0;
var memory: number = 0.0;
var operator: number = ButtonDefinitions.NUMBER_BUTTON_PLUS;

let buttonLayout = [
    {col1: ButtonDefinitions.NUMBER_BUTTON_CLEAR, col2: ButtonDefinitions.NUMBER_BUTTON_INVERT, col3: ButtonDefinitions.NUMBER_BUTTON_PERCENT, col4: ButtonDefinitions.NUMBER_BUTTON_DIVIDE},
    {col1: 7, col2: 8, col3: 9, col4: ButtonDefinitions.NUMBER_BUTTON_MULTIPLY},
    {col1: 4, col2: 5, col3: 6, col4: ButtonDefinitions.NUMBER_BUTTON_MINUS},
    {col1: 1, col2: 2, col3: 3, col4: ButtonDefinitions.NUMBER_BUTTON_PLUS},
    {col1: 0, col2: 0, col3: ButtonDefinitions.NUMBER_BUTTON_DECIMAL_POINT, col4: ButtonDefinitions.NUMBER_BUTTON_EQUALS},
]

export class Number_pad extends React.Component<Number_padProps, {ReadoutNumber: number}>{
    constructor(props: any){
        super(props);
        this.state = {ReadoutNumber: onScreenReadout}
    }

    generateButtons(){
        return buttonLayout.map((button: {
            col1: number;
            col2: number;
            col3: number;
            col4: number}) =>
            <div>
                <Calculator_button value={button.col1} handleClick={() => this.clickHandler(button.col1)} />
                <Calculator_button value={button.col2} handleClick={() => this.clickHandler(button.col2)} />
                <Calculator_button value={button.col3} handleClick={() => this.clickHandler(button.col3)} />
                <Calculator_button value={button.col4} handleClick={() => this.clickHandler(button.col4)} />
            </div>)
    }

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

        return answer;
    }

    addDigit(digit: number): number {
        switch(digit){
            case ButtonDefinitions.NUMBER_BUTTON_CLEAR:{
                onScreenReadout = 0;
                memory = 0;
                operator = ButtonDefinitions.NUMBER_BUTTON_PLUS;
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

            default:{
                onScreenReadout = onScreenReadout * 10 + digit;
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
        return <div>
            <div>
                <Number_Readout readoutNumber={this.state.ReadoutNumber}/>
            </div>
            {this.generateButtons()}
        </div>
    }
}