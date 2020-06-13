import * as React from "react"

export interface Number_readoutProps {readoutNumber: number}

export class Number_Readout extends React.Component<Number_readoutProps, {}>{
    //constructor(props: Readonly<number_readoutProps>){
    //    super(props);
    //    this.state = {outputNumber: ""};
    //}
    render(){
        return <div className="readout">{this.props.readoutNumber}</div>;
    }
}