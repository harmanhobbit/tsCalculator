import * as React from "react"

export interface Number_padProps {}

import { Calculator_button } from "./calculator_button";
import { Number_Readout } from "./number_readout"

var onScreenReadout: number = 0;

let buttonLayout = [
    [7, 8, 9, 13],
    [4, 5, 6, 14]
]

export class Number_pad extends React.Component<Number_padProps, {ReadoutNumber: number}>{
    constructor(props: any){
        super(props);
        this.state = {ReadoutNumber: onScreenReadout}
    }

    addDigit(digit: number): number {
        return onScreenReadout = onScreenReadout * 10 + digit;
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
            <div>
                <Calculator_button value={7} handleClick={() => this.clickHandler(7)} />
                <Calculator_button value={8} handleClick={() => this.clickHandler(8)} />
                <Calculator_button value={9} handleClick={() => this.clickHandler(9)} />
                <Calculator_button value={13} handleClick={() => this.clickHandler(13)} />
            </div>
            <div>
                <Calculator_button value={4} handleClick={() => this.clickHandler(4)} />
                <Calculator_button value={5} handleClick={() => this.clickHandler(5)} />
                <Calculator_button value={6} handleClick={() => this.clickHandler(6)} />
                <Calculator_button value={14} handleClick={() => this.clickHandler(14)} />
            </div>
            <div>
                <Calculator_button value={1} handleClick={() => this.clickHandler(1)} />
                <Calculator_button value={2} handleClick={() => this.clickHandler(2)} />
                <Calculator_button value={3} handleClick={() => this.clickHandler(3)} />
                <Calculator_button value={12} handleClick={() => this.clickHandler(12)} />
            </div>
            <div>
                <Calculator_button value={0} handleClick={() => this.clickHandler(0)} />
                <Calculator_button value={10} handleClick={() => this.clickHandler(10)} />
            </div>
        </div>
    }
}