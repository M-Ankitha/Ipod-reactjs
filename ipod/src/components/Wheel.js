import React from 'react';
import "../css/Wheel.css"
import ZingTouch from 'zingtouch';
// Render wheel
class Wheel extends React.Component {
    constructor() {
        super();
        this.angle = 0;
    }
    render() {
        const { changeMenuForward, active, currentMenu, theme,wheelColor } = this.props;
        return (
            <div className="wheel-container" id="wheel-container">
                <div style={{backgroundColor:wheelColor}} className="wheel" id="wheel" >
                    <div className="controll" id="menu">
                        <div style={{color:theme}}>MENU</div>
                    </div>
                    <div className="controll" id="forward">
                        <img className="controll" id="forward" src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-forward-24.png"/>
                    </div>
                    <div className="controll" id="play-pause">
                        <div>
                            <img className="controll" id="play-pause" src="https://user-images.githubusercontent.com/99132893/222653735-fd1d9359-c2f9-4732-a2af-aefc252b6388.png"/>
                            
                        </div>
                    </div>
                    <div className="controll" id="reverse">
                        <img className="controll" id="reverse" src="https://cdn2.iconfinder.com/data/icons/snipicons/5000/fast-backward-24.png"/>
                    </div>
                </div>

                <div style={{backgroundColor:theme}} className="blank" id="blank" onClick={() => { changeMenuForward(active, currentMenu) }}></div>
            </div>
        )
    }

    // control the wheel roatation action if rotation is more than 15 degrees and also check direction of rotation
    wheelControll = (e) => {
        const { updateActiveMenu, currentMenu } = this.props;

        if (e.detail.distanceFromOrigin === 0) {
            this.angle = e.detail.angle;
        }
        if (Math.abs(this.angle - e.detail.angle) > 300) {
            this.angle = Math.abs(e.detail.angle);
            if (e.detail.distanceFromLast === 0) {
                return;
            }
            else if (e.detail.distanceFromLast < 0) {
                updateActiveMenu(1, currentMenu);
            } else {
                updateActiveMenu(0, currentMenu);
            }

        } else if (Math.abs(this.angle - e.detail.angle) > 15) {
            this.angle = Math.abs(e.detail.angle);
            if (e.detail.distanceFromLast === 0) {
                return;
            }
            else if (e.detail.distanceFromLast > 0) {
                updateActiveMenu(1, currentMenu);
            } else {
                updateActiveMenu(0, currentMenu);
            }

        }
    }

    // Bind components with zingtouch logic
    componentDidMount() {
        const { changeMenuBackward ,togglePlayPause, seekSongForward, seekSongReverse} = this.props;
        const wheelControll = this.wheelControll;
        const wheel = document.getElementById("wheel");
        const activeRegion = ZingTouch.Region(wheel);
        const menuIcon = document.getElementById("menu");
        const playPause = document.getElementById("play-pause");
        const reverse = document.getElementById("reverse");
        const forward = document.getElementById("forward");

        const longTapGesture = new ZingTouch.Tap({
            maxDelay:10000,
            numInputs: 1,
            tolerance: 1,
        })

        activeRegion.bind(menuIcon, 'tap', function (e) {
            changeMenuBackward();
        });
        activeRegion.bind(wheel, 'rotate', function (e) {
            wheelControll(e);
        });
        activeRegion.bind(playPause, 'tap', function (e) {
            togglePlayPause();
        });

        activeRegion.bind(reverse, longTapGesture, function (e) {
            seekSongReverse(e);
        });

        activeRegion.bind(forward, longTapGesture, function (e) {
            seekSongForward(e);
        });
        

    }

}


export default Wheel;