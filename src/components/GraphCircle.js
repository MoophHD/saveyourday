/* eslint-disable */

import React, {Component} from 'react'
import * as createjs from 'createjs-module';
import moment from 'moment';
import ColorHash from 'color-hash'


export default class GraphCircle extends Component{
    componentDidMount() {
      this.arcTimeSpent = {};
    }
    init(target) {
        let originX = 0,
            originY = 0,
            offsetX = 250,
            offsetY = 150;
    
        this.stage = new createjs.Stage(target);
        let stage = this.stage;
    
        let mainCircle = new createjs.Shape();
        let circle = new createjs.Graphics.Circle(0, 0, 150);
        let color = new createjs.Graphics.Fill('lightgray');
    
        mainCircle.graphics.append(createjs.Graphics.beginCmd)
          .append(circle)
          .append(color);
    
        this.container = new createjs.Container();
        let container = this.container;
    
        container.x = offsetX;
        container.y = offsetY;
        mainCircle.x = offsetX;
        mainCircle.y = offsetY;
    
        stage.addChild(mainCircle, container );
        stage.update();
    
        this.redrawArcs();
        
        createjs.Ticker.setFPS(12);
    
        createjs.Ticker.addEventListener("tick", handleTick.bind(this));
        function handleTick(event) {
            if (!createjs.Ticker.getPaused()) {
                this.redrawArcs();
            }
    
        stage.update(event);
    
        
        }

        setTimeout(() => this.stage.enableMouseOver(12), 500);
      }
      redrawArcs() {
    
        let state = this.props.globalState;
        let activeTag = this.props.activeTag;
        let {allIds, byId, lastDate} = this.props.timeSlices;
        let {allIds:tagIds, byId:tagById} = this.props.tagHistory;
    
        let allTime = 0;
        let timeSpent = {};
        let oldAnchor = -Math.PI/2;
    
        lastDate = lastDate.split(':');
        let lDateMoment = moment({h: lastDate[0], m: lastDate[1], s:lastDate[2]});
        

        allIds.forEach(function(id) {
          let start = byId[id].start.split(':');
          let finish = byId[id].finish.split(':');
          
          let d1 = moment({h:start[0], m:start[1], s:start[2]});
          let d2 = moment({h:finish[0], m:finish[1], s:finish[2]});
          
          let diff = d2.diff(d1, 'seconds');
    
          if (tagIds.indexOf(id) != -1 ) {
            let tag = tagById[id];
            timeSpent[tag] = timeSpent[tag] ? timeSpent[tag] + diff : diff;
          }
    
          allTime += diff;
          
        }, this);
    
        let lastDateDiff = moment(new Date()).diff(lDateMoment, 'seconds');
    
        allTime += lastDateDiff;
        
        if (activeTag == '') activeTag = 'None';
    
        if (state) {
          timeSpent[activeTag] = timeSpent[activeTag] ? timeSpent[activeTag] + lastDateDiff : lastDateDiff;
        }
        
        if (this.container.children) {
            this.container.children.forEach((el) => {
            el.removeAllEventListeners();
          });
        }
        this.container.removeAllChildren();
        
        for (let tag in timeSpent) {        

          let anchor = oldAnchor + (timeSpent[tag] /allTime) * 2 * Math.PI;
          let colorHash = new ColorHash({saturation: 0.35, lightness: 0.65});
          let colorArr = colorHash.rgb(tag);
    
          let color = {r:colorArr[0], g:colorArr[1], b: colorArr[2]};
    
          let arcShape = new createjs.Shape();
    
          arcShape.graphics.f(createjs.Graphics.getRGB(color.r, color.g, color.b));
          arcShape.graphics.moveTo(0, 0);
          arcShape.graphics.arc(0, 0, 150, oldAnchor, anchor);
          arcShape.attachedTag = tag;
          arcShape.addEventListener("mouseover", this.handleArcHover.bind(this));
          arcShape.addEventListener("mouseout", this.handleArcUnhover.bind(this));
    
          oldAnchor = anchor;
          
          this.container.addChild(arcShape);
        }

      }

      
      handleArcUnhover(e) {
        if (!this.lastTagLabel) return;
        this.stage.removeChild(this.lastTagLabel);
        this.lastTagLabel = null;
        this.stage.update();
      }

      handleArcHover(e) {
        let arc = e.target;
    
        if (this.lastTagLabel && this.lastTagLabel.attachedTag == arc.attachedTag) return;
    
        let rectH = 50;
        let rectW = 150;
    
    
        
        let tagLb = new createjs.Shape(
          new createjs.Graphics().f("white").drawRect(0, 0, rectW, rectH)
        );
    
        let tagText = new createjs.Text(arc.attachedTag, "18px Roboto", "#333")
    
        tagText.set({
          textAlign: 'center',
          textBaseline: 'middle',
          x: rectW / 2,
          y: rectH / 2
        })
    
        let tagLbContainer = new createjs.Container();
        tagLbContainer.addChild(tagLb, tagText);
    
        tagLbContainer.x = 100;
        tagLbContainer.y = 100;
    
        tagLbContainer.attachedTag = arc.attachedTag;
        
        this.stage.addChild(tagLbContainer);
    
        this.lastTagLabel = tagLbContainer;
    
        this.stage.update();
    
      }

      toggleCanvas() {
        this.stage.enableMouseOver(12);
        
        if (createjs.Ticker.getPaused()) {
          
          this.togglePause();
        } else {
          this.redrawArcs();
          this.container.children.forEach((el) => {
            let arcCommand = el.graphics.command;
            createjs.Tween.get(el.graphics.command)
            .to({endAngle: 0}, 650, createjs.Ease.quintIn);
          })
    
          this.togglePause();
          this.stage.update();
          
        }
      }

      togglePause() {
        createjs.Ticker.setPaused(!createjs.Ticker.getPaused());
      }
    
    render() {
        return(
            <canvas style={{display: this.props.show ? 'block' : 'none'}} className="pageCanvas" ref={(e) => this.init(e)} width="500" height="500"></canvas>
        )
    }
}

