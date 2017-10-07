/* eslint-disable */

import React, {Component} from 'react'
import * as createjs from 'createjs-module';

export default class TestCommand extends Component {
    init(target) {
        this.stage = new createjs.Stage(target);
        let shape1 = new createjs.Shape();
        let shape2 = new createjs.Shape();
        
        
        let circle = new createjs.Graphics.Circle(0, 0, 150);

        let color = new createjs.Graphics.Fill('cyan');

        let myGraphics = new createjs.Graphics();
        let commandFill = myGraphics.beginFill("tomato").command;
        let commandArc = myGraphics.arc(0, 0, 150, 0, Math.PI ).command;
        

        shape1.graphics.append(createjs.Graphics.beginCmd)
          .append(circle)
          .append(commandFill);
        
        shape2.graphics.append(createjs.Graphics.beginCmd)
          .append(commandArc)
          .append(color);

        shape1.x = 250;
        shape1.y = 250;
        shape2.x = 250;
        shape2.y = 250;

        this.stage.addChild(shape1);
        this.stage.addChild(shape2);
        
        this.stage.update();

        createjs.Ticker.setFPS(12);

        createjs.Ticker.addEventListener("tick", handleTick.bind(this));     

        function handleTick() {
            commandArc.startAngle += .1;
            this.stage.update();
        }   
    }

    render() {
        return (
            <canvas ref={(e) => this.init(e)} height="500" width="500"></canvas>
        )
    }
}